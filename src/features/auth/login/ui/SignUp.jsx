import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import styles from '@shared/styles/userForm.module.scss'
import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { Input } from '@shared/ui/input'
import { useModal } from '@shared/hooks/useModal'
import { Modal } from '@shared/ui/modal/Modal'
import { PromptTo } from '@shared/ui/promptTo'

import { formFields } from '../const/formField'
import { useSignUpUserMutation } from '../api/signUpApi'

import { PrivacyPolicy } from './PrivacyPolicy'

export const SignUp = () => {
  const { register, handleSubmit, formState, getValues, setError, setFocus } = useForm({
    mode: 'onChange',
  })
  const [signUpUser, { data }] = useSignUpUserMutation()
  const { isVisible, show, hide, modalRef } = useModal()

  const onSubmit = async ({ username, email, password }) => {
    const user = {
      username,
      email,
      password,
    }
    const signUpUserData = await signUpUser({ user })

    if (signUpUserData.error?.data.errors) {
      for (let [name, text] of Object.entries(signUpUserData.error?.data.errors)) {
        setError(name, { message: `${name.charAt(0).toUpperCase() + name.slice(1)} ${text}` })
        setFocus(name)
      }
    } else {
      show()
    }
  }

  const validation = {
    email: {
      required: 'This field is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
    username: {
      required: 'This field is required',
      pattern: {
        value: /^[A-Za-z0-9]{1,100}$/,
        message: 'Username is invalid',
      },
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Your password needs to be at least 6 characters',
      },
      pattern: {
        value: /^.{6,}$/,
        message: 'Your password needs to be at least 6 characters',
      },
    },
    'repeat-password': {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Your password needs to be at least 6 characters',
      },
      pattern: {
        value: /^.{6,}$/,
        message: 'Your password needs to be at least 6 characters',
      },
      validate: (value) => {
        const { password } = getValues()
        return value === password || 'Passwords must match'
      },
    },
  }

  const errors = {
    email: formState.errors['email']?.message,
    username: formState.errors['username']?.message,
    password: formState.errors['password']?.message,
    'repeat-password': formState.errors['repeat-password']?.message,
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={styles['form-fieldset']}>
          <legend className={styles['form-legend']}>Create New Account</legend>
          {formFields.map((field) => (
            <Input
              key={field.id}
              label={field.label}
              htmlFor={field.htmlFor}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
            />
          ))}
        </fieldset>
        <PrivacyPolicy
          validation={{
            ...register('agree', {
              required: true,
            }),
          }}
        />
        <SubmitButton label="Create" type="submit" disabled={!formState.isValid} />
        <PromptTo to="/login" linkTitle="Sign In" />
      </form>

      <Modal
        title={'Sign-Up success!'}
        onOk={() => {
          hide()
        }}
        isVisible={isVisible}
        onCancel={hide}
        modalRef={modalRef}>
        <>
          <p>{`Welcome to our community, ${data?.user.username}`}!</p>
          <Link to="/login">
            <span>Now you can login to your account.</span>
          </Link>
        </>
      </Modal>
    </>
  )
}
