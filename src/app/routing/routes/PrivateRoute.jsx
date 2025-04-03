import { Navigate } from 'react-router'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { selectUserIsAuth } from '@entities/User'

export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectUserIsAuth())
  console.log(isAuth)
  return isAuth ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
