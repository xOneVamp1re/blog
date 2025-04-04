import { Navigate } from 'react-router'
import PropTypes from 'prop-types'

import { useAuth } from '@shared/hooks/useAuth'

export const AuthRoute = ({ children }) => {
  const isAuth = useAuth()
  return !isAuth ? children : <Navigate to="/" />
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
