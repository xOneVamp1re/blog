import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Input.module.scss'

export const Input = (props) => {
  const { label, htmlFor, type, id, placeholder, validation = {}, error = '', classNames = {} } = props

  return (
    <div className={styles['form-field']}>
      {label && (
        <Input.Label className={classNames.label} htmlFor={htmlFor}>
          {label}
        </Input.Label>
      )}
      <Input.Field className={classNames.input} type={type} id={id} placeholder={placeholder} validation={validation} />
      <Input.Error className={classNames.error} error={error} />
    </div>
  )
}

Input.Label = function InputLabel({ htmlFor, children, className = '' }) {
  const labelClasses = classNames(styles.label, styles[className])
  return (
    <label className={labelClasses} htmlFor={htmlFor}>
      {children}
    </label>
  )
}

Input.Field = function InputField({ type, id, placeholder, validation, className = '' }) {
  const inputClasses = classNames(styles.input, styles[className])

  return <input className={inputClasses} type={type} id={id} placeholder={placeholder} {...validation} />
}

Input.Error = function InputError({ error, className = '' }) {
  const errorClasses = classNames(styles.error, styles[className])

  return error ? <div className={errorClasses}>{error}</div> : null
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  error: PropTypes.string,
  classNames: PropTypes.object,
}

Input.Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Input.Field.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
}
Input.Error.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
}
