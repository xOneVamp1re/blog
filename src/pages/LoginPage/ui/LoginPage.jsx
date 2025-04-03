import { Link } from 'react-router'

import { LoginUser } from '@features/auth/login'

import styles from './LoginPage.module.scss'
export const LoginPage = () => {
  const isAuth = localStorage.getItem('auth') || false
  if (isAuth) return null
  return (
    <main className={styles.main}>
      <LoginUser />
    </main>
  )
}
