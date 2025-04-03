import { Link } from 'react-router'

import { SignUpUser } from '@features/auth/signUp'

import styles from './SignUpPage.module.scss'

export const SignUpPage = () => {
  const isAuth = localStorage.getItem('auth') || false
  if (isAuth) return null
  return (
    <main className={styles.main}>
      <SignUpUser />
    </main>
  )
}
