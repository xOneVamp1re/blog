import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './SubmitButton.module.scss'

export const SubmitButton = ({ label, type, disabled, className = '' }) => {
  const buttonClasses = classNames(styles.button, {
    [styles.disabled]: disabled,
    [styles[className]]: className,
  })
  return (
    <button type={type} className={buttonClasses} disabled={disabled}>
      {label}
    </button>
  )
}

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
}
