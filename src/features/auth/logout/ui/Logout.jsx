import { useDispatch } from 'react-redux'

import { userIsAuth } from '@entities/User'

import styles from './Logout.module.scss'

export const Logout = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    dispatch(userIsAuth())
  }
  return (
    <button onClick={handleClick} className={styles.button}>
      Log Out
    </button>
  )
}
