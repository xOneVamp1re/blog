import PropTypes from 'prop-types'

import styles from './Input.module.scss'
export const Input = (props) => {
  const { label, htmlFor, type, id, placeholder, validation = {}, error = '', lastError } = props
  // console.log(validation)
  return (
    <>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      <input className={styles.input} type={type} id={id} placeholder={placeholder} {...validation} />
      {error && <div className={!lastError ? styles.error : styles['last-error']}>{error}</div>}
    </>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  error: PropTypes.string,
  lastError: PropTypes.bool,
}
