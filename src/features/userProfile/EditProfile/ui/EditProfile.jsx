import { useForm } from 'react-hook-form'

import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { Input } from '@shared/ui/input'
import styles from '@shared/styles/userForm.module.scss'

import { formFields } from '../const/formField'
import { useEditProfileMutation } from '../api/editProfileApi'

export const EditProfile = () => {
  const { register, handleSubmit, formState, reset, setError } = useForm({
    mode: 'onChange',
  })
  const [editProfile] = useEditProfileMutation()
  // const { data } = useGetUserQuery()
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
      /*  const {
        data: { user = {} },
      } = response

      if (user?.username === data.username) {
        setError('username', { message: 'Ты дебил, имя такое же', shouldFocus: true })
      } */
      reset()
    }
  }
  const validation = {
    username: {
      required: 'This field is required',
      minLength: { value: 3, message: 'Username must be at least 3 characters' },
      maxLength: { value: 20, message: 'Username must be at most 20 characters' },
      pattern: {
        value: /^[a-zA-Z0-9]{3,20}$/,
        message: 'Only letters and numbers are allowed',
      },
    },
    email: {
      required: 'This field is required',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      requeired: 'This field is required',
      minLength: {
        value: 6,
        message: 'Your password needs to be at least 6 characters',
      },
      pattern: {
        value: /^.{6,}$/,
        message: 'Your password needs to be at least 6 characters',
      },
    },
    avatar: {
      required: 'This field is required',
      pattern: {
        value: /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/[^\s]*)?$/i,
        message: 'Invalid URL',
      },
    },
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
