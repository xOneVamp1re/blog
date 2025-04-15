import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import styles from '@shared/styles/userForm.module.scss'
import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { Input } from '@shared/ui/input'
import { PromptTo } from '@shared/ui/promptTo'
import { useModal } from '@shared/hooks/useModal'
import { Modal } from '@shared/ui/modal/Modal'

import { formFields } from '../const/formField'
import { useLoginUserMutation } from '../api/loginApi'

export const LoginUser = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  })
  const [loginUser] = useLoginUserMutation()
  const navigate = useNavigate()
  const { isVisible, show, hide, modalRef } = useModal(true)

  const onSubmit = async ({ email, password }) => {
    const user = {
      email,
      password,
    }
    const loginUserData = await loginUser({ user })

    if (loginUserData?.error) {
      show()
    } else {
      navigate('/')
    }
  }

  const validation = {
    email: {
      required: 'This field is required',
      pattern: {
        value: /^(?!.*\s)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
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
        value: /^\S*$/,
        message: 'Password should not contain spaces',
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
              autocomplete={field.autocomplete}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
            />
          ))}
        </fieldset>
        <SubmitButton label="Login" type="submit" disabled={Object.keys(formState.errors).length > 0} />
        <PromptTo to="/signUp" link="Sign Up" prompt="Don’t have an account?" />
      </form>
      <Modal
        title="Error"
        onOk={() => {
          hide()
        }}
        isVisible={isVisible}
        onCancel={hide}
        modalRef={modalRef}
        customClassName="error">
        <p>Invalid email or password</p>
      </Modal>
    </>
  )
}
