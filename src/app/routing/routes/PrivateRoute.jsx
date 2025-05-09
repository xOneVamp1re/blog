import { Navigate } from 'react-router'
import PropTypes from 'prop-types'

import { useAuth } from '@shared/hooks/useAuth'

export const PrivateRoute = ({ children }) => {
  const isAuth = useAuth()
  return isAuth ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
