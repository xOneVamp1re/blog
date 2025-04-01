import { Navigate } from 'react-router'
import PropTypes from 'prop-types'

export const PrivateRoute = ({ children }) => {
  const { isAuth } = false
  return isAuth ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
