import { SignUp } from '@features/auth/signUp/ui/SignUp'

import styles from './SignUpPage.module.scss'

export const SignUpPage = () => {
  return (
    <main className={styles.main}>
      <SignUp />
    </main>
  )
}
