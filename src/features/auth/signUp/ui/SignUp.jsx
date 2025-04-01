import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { Input } from '@shared/ui/input'
import { useModal } from '@shared/hooks/useModal'
import { Modal } from '@shared/ui/modal/Modal'
import { modalInfo } from '@shared/lib/modalInfo'

import { formFields } from '../const/formField'
import { useSignUpUserMutation } from '../api/signUpApi'

import styles from './SignUp.module.scss'
import { SignInPrompt } from './SignInPrompt'
import { PrivacyPolicy } from './PrivacyPolicy'

export const SignUp = () => {
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
  })
  const [signUpUser, { isLoading, isError, error, data }] = useSignUpUserMutation()
  const { isVisible, show, hide, modalRef } = useModal()
  const onSubmit = async ({ username, email, password }) => {
    const user = {
      username,
      email,
      password,
    }
    await signUpUser({ user })
    return show()
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
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters long',
      },
      pattern: {
        value: /^.{6,}$/,
        message: 'Password must be at least 6 characters long',
      },
    },
    'repeat-password': {
      required: 'This field is required',
      validate: (value) => {
        const { password } = getValues()
        return value === password || 'Passwords do not match'
      },
    },
    agree: {
      required: 'You must agree to the terms of service',
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
          {formFields.map((field, index) => (
            <Input
              key={field.id}
              label={field.label}
              htmlFor={field.htmlFor}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
              lastError={formFields.length - 1 === index ? true : false}
            />
          ))}
        </fieldset>
        <PrivacyPolicy
          validation={{
            ...register('agree', validation.agree),
          }}
        />
        <SubmitButton label="Create" type="submit" disabled={!formState.isValid} />
        <SignInPrompt />
      </form>
      <Modal
        title={isError ? 'Sign-Up Failed' : 'Sign-Up success!'}
        onOk={() => {
          hide()
        }}
        isVisible={isVisible}
        onCancel={hide}
        modalRef={modalRef}>
        {isError ? (
          <ul>
            {modalInfo(error).map((el) => (
              <li key={el}>{el.replace(/\./g, '')}</li>
            ))}
          </ul>
        ) : (
          <>
            <p>{`Welcome to our community, ${data?.user.username}`}!</p>
            <Link to="/login">
              <span>Now you can login to your account.</span>
            </Link>
          </>
        )}
      </Modal>
    </>
  )
}
