import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Textarea.module.scss'

export const Textarea = (props) => {
  const { label, htmlFor, type, id, placeholder, validation = {}, error = '', classNames = {}, onChange } = props

  return (
    <div className={styles['form-field']}>
      {label && (
        <Textarea.Label className={classNames.label} htmlFor={htmlFor}>
          {label}
        </Textarea.Label>
      )}
      <Textarea.Field
        className={classNames.input}
        type={type}
        id={id}
        placeholder={placeholder}
        validation={validation}
        onChange={onChange}
      />
      <Textarea.Error className={classNames.error} error={error} />
    </div>
  )
}

Textarea.Label = function TextareaLabel({ htmlFor, children, className = '' }) {
  const labelClasses = classNames(styles.label, styles[className])
  return (
    <label className={labelClasses} htmlFor={htmlFor}>
      {children}
    </label>
  )
}

Textarea.Field = function TextareaField({ type, id, placeholder, validation, onChange, className = '' }) {
  const textareaClasses = classNames(styles.textarea, styles[className])

  return (
    <textarea
      className={textareaClasses}
      type={type}
      onChange={onChange}
      id={id}
      placeholder={placeholder}
      rows="6"
      {...validation}
    />
  )
}

Textarea.Error = function TextareaError({ error, className = '' }) {
  const errorClasses = classNames(styles.error, styles[className])

  return error ? <div className={errorClasses}>{error}</div> : null
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  classNames: PropTypes.object,
}

Textarea.Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Textarea.Field.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.object,
}
Textarea.Error.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
}
