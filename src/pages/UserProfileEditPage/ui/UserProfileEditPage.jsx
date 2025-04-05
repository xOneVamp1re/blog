import { EditProfile } from '@features/userProfile/EditProfile'

import styles from './UserProfileEditPage.module.scss'
export const UserProfileEditPage = () => {
  return (
    <main className={styles.main}>
      <EditProfile />
    </main>
  )
}
