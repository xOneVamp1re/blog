import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { Input } from '@shared/ui/input'
import { selectApiToken, useGetUserQuery } from '@entities/User'
import styles from '@shared/styles/userForm.module.scss'

import { formFields } from '../const/formField'
import { validation } from '../const/validationRules'
import { useEditProfileMutation } from '../api/editProfileApi'

export const EditProfile = () => {
  const { register, handleSubmit, formState, reset, setError } = useForm({
    mode: 'onChange',
  })
  const token = useSelector(selectApiToken)
  const { data } = useGetUserQuery(token)
  const [editProfile] = useEditProfileMutation()

  useEffect(() => {
    if (data) {
      reset({
        username: data.username,
        email: data.email,
      })
    }
  }, [reset, data])

  const onSubmit = async ({ username, email, password, avatar: image }) => {
    const updateUser = {
      user: {
        username,
        email,
        password,
        image,
      },
    }
    const response = await editProfile(updateUser)
    if (response.error?.errors) {
      for (const [name, message] of Object.entries(response?.error.errors)) {
        const msg = `${name.at(0).toUpperCase()}${name.slice(1)} ${message}`
        setError(name, { message: msg }, { shouldFocus: true })
      }
    } else {
      reset({
        username: data?.username,
        email: data?.email,
      })
    }
  }

  const errors = {
    username: formState.errors['username']?.message,
    email: formState.errors['email']?.message,
    password: formState.errors['password']?.message,
    avatar: formState.errors['avatar']?.message,
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={styles['form-fieldset']}>
          <legend className={styles['form-legend']}>Edit Profile</legend>
          {formFields.map((field) => (
            <Input
              key={field.id}
              label={field.label}
              type={field.type}
              htmlFor={field.htmlFor}
              id={field.id}
              placeholder={field.placeholder}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
            />
          ))}
        </fieldset>
        <SubmitButton label="Save" type="submit" disabled={Object.keys(formState.errors).length > 0} />
      </form>
    </>
  )
}
