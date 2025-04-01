import { Link } from 'react-router'

import { AuthButton } from '@shared/ui/button/AuthButton'

import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link style={{ marginRight: 'auto' }} to="/">
        <h1 className={styles['header-title']}>uNreeeeeeealWorld Blog </h1>
      </Link>
      <AuthButton label="Sign In" to="/login" />
      <AuthButton label="Sign Up" to="/signUp" isActive={true} />
    </header>
  )
}
