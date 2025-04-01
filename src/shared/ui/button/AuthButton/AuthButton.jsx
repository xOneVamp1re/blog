import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

import styles from './AuthButton.module.scss'

export const AuthButton = ({ label, to, isActive, ...props }) => {
  const navigate = useNavigate()
  const handleClick = (to) => {
    navigate(to)
  }
  return (
    <button
      className={isActive ? styles['auth-button-active'] : styles['auth-button']}
      type="button"
      onClick={() => handleClick(to)}
      {...props}
      aria-label={`Button: ${label}`}>
      {label}
    </button>
  )
}

AuthButton.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}
