import { LoginUser } from '@features/auth/login'

import styles from './LoginPage.module.scss'
export const LoginPage = () => {
  return (
    <main className={styles.main}>
      <LoginUser />
    </main>
  )
}
