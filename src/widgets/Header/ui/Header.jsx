import { Link } from 'react-router'

import { Logout } from '@features/auth/logout'
import { useAuth } from '@shared/hooks/useAuth'
import { ProfileDropdown } from '@features/userProfile/ProfileDropdown'
import { LinkButton } from '@shared/ui/button/LinkButton'

import styles from './Header.module.scss'

export const Header = () => {
  const isAuth = useAuth()

  return (
    <header className={styles.header}>
      <Link style={{ marginRight: 'auto' }} to="/">
        <h1 className={styles['header-title']}>uNreeeeeeealWorld Blog </h1>
      </Link>
      {!isAuth && (
        <Link to="/login">
          <span className={styles['link-sign-in']}>Sign In</span>
        </Link>
      )}
      {!isAuth && (
        <Link to="/signUp">
          <span className={styles['link-sign-up']}>Sign Up</span>
        </Link>
      )}
      {isAuth && <LinkButton action="create" buttonText="Create article" to="/createArticle" />}
      {isAuth && <ProfileDropdown />}
      {isAuth && <Logout />}
    </header>
  )
}
