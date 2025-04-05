import { useSelector } from 'react-redux'
import { skipToken } from '@reduxjs/toolkit/query'

import { useGetUserQuery, selectApiToken } from '@entities/User'

import styles from './UserProfile.module.scss'

export const UserProfile = () => {
  const token = useSelector(selectApiToken)
  const { data: user } = useGetUserQuery(token || skipToken)

  return (
    <article className={styles.profile}>
      <img
        src={
          user?.image ||
          'https://w7.pngwing.com/pngs/67/675/png-transparent-account-avatar-man-person-profile-business-and-marketing-icon.png'
        }
        alt="Profile"
        className={styles['profile-img']}
      />
      <ul className={styles['profile-info']}>
        <li>Username: {user?.username} </li>
        <li>Email: {user?.email} </li>
        <li>Bio: Я могла бы быть здесь.</li>
      </ul>
    </article>
  )
}
