import { useSelector } from 'react-redux'

import { selectUserIsAuth } from '@entities/User'

export const useAuth = () => {
  const isAuth = useSelector(selectUserIsAuth)
  return isAuth
}
