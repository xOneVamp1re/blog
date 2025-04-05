import { Link } from 'react-router'

import styles from './Header.module.scss'
export const HeaderWithoutAuth = () => {
  return (
    <>
      <Link to="/login">
        <span className={styles['link-sign-in']}>Sign In</span>
      </Link>

      <Link to="/signUp">
        <span className={styles['link-sign-up']}>Sign Up</span>
      </Link>
    </>
  )
}
