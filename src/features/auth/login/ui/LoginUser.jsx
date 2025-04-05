import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import styles from '@shared/styles/userForm.module.scss'
import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { Input } from '@shared/ui/input'
import { PromptTo } from '@shared/ui/promptTo'

import { formFields } from '../const/formField'
import { useLoginUserMutation } from '../api/loginApi'

export const LoginUser = () => {
  const { register, handleSubmit, formState, setError, setFocus } = useForm({
    mode: 'onChange',
  })
  const [loginUser] = useLoginUserMutation()
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }) => {
    const user = {
      email,
      password,
    }
    const loginUserData = await loginUser({ user })

    if (loginUserData?.error) {
      const [error] = Object.entries(loginUserData.error.data.errors)
      const errorMessage = `${error.join(' ').slice(0, 1).toUpperCase() + error.join(' ').slice(1)}`

      setError('email', { message: errorMessage })
      setError('password', { message: errorMessage })
      setFocus('email')
    } else {
      navigate('/')
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
    password: {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Your password needs to be at least 6 characters',
      },
      maxLength: {
        value: 40,
        message: 'Your password needs to be at most 40 characters',
      },
      pattern: {
        value: /^.{6,40}$/,
      },
    },
  }

  const errors = {
    email: formState.errors['email']?.message,
    password: formState.errors['password']?.message,
  }
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={styles['form-fieldset']}>
          <legend className={styles['form-legend']}>Sign In</legend>
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
        <SubmitButton label="Login" type="submit" disabled={Object.keys(formState.errors).length > 0} />
        <PromptTo to="/signUp" link="Sign Up" prompt="Don’t have an account?" />
      </form>
    </>
  )
}
