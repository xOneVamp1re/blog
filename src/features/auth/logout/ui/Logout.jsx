import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { logoutUser } from '@entities/User'
// import { baseApi } from '@shared/API/api'

import styles from './Logout.module.scss'

export const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async () => {
    dispatch(logoutUser())
    // dispatch(baseApi.util.resetApiState())
    navigate('/', { replace: true })
  }
  return (
    <button onClick={handleClick} className={styles.button}>
      Log Out
    </button>
  )
}
