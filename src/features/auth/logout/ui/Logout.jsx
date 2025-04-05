import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { logoutUser } from '@entities/User'

import styles from './Logout.module.scss'

export const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async () => {
    dispatch(logoutUser())
    navigate('/', { replace: true })
  }
  return (
    <button onClick={handleClick} className={styles.button}>
      Log Out
    </button>
  )
}
