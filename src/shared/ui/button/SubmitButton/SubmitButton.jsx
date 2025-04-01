import PropTypes from 'prop-types'

import styles from './SubmitButton.module.scss'

export const SubmitButton = ({ label, type, disabled }) => {
  return (
    <button type={type} className={`${styles.button} ${disabled ? styles.disabled : ''} `} disabled={disabled}>
      {label}
    </button>
  )
}

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
}
