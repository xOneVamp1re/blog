import { Link } from 'react-router'

import styles from './SignUp.module.scss'

export const SignInPrompt = () => {
  return (
    <p className={styles['form-signin-prompt']}>
      Already have an account?{' '}
      <Link to="/login">
        <span className={styles['form-signin-prompt-link']}>Sign In</span>
      </Link>
      .
    </p>
  )
}
