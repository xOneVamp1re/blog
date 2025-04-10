import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './ModifyButton.module.scss'
export const ModifyButton = ({ action, buttonText, cb }) => {
  const classes = classNames(styles.button, styles[action])

  return (
    <button className={classes} type="button" onClick={() => cb()}>
      {buttonText}
    </button>
  )
}

ModifyButton.propTypes = {
  action: PropTypes.string,
  buttonText: PropTypes.string,
  cb: PropTypes.func,
}
