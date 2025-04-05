import { useSelector } from 'react-redux'
import { Link } from 'react-router'

import { useAuth } from '@shared/hooks/useAuth'
import { selectUserAvatarIsLoading, selectUserIsLoading } from '@entities/User'
import { PageLoader } from '@shared/ui/loaders'

import { HeaderWithAuth } from './HeaderWithAuth'
import { HeaderWithoutAuth } from './HeaderWithoutAuth'
import styles from './Header.module.scss'

export const Header = () => {
  const isLoadingUser = useSelector(selectUserIsLoading)
  const isAvatarLoading = useSelector(selectUserAvatarIsLoading)
  const isAuth = useAuth()

  return (
    <header className={styles.header}>
      <Link style={{ marginRight: 'auto' }} to="/">
        <h1 className={styles['header-title']}>uNreeeeeeealWorld Blog </h1>
      </Link>
      {!isAuth && <HeaderWithoutAuth />}
      {isAuth && !isLoadingUser && <HeaderWithAuth />}
      {isLoadingUser && <PageLoader />}
      {isAvatarLoading && <PageLoader />}
    </header>
  )
}
