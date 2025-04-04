import { SignUpUser } from '@features/auth/signUp'

import styles from './SignUpPage.module.scss'

export const SignUpPage = () => {
  return (
    <main className={styles.main}>
      <SignUpUser />
    </main>
  )
}
