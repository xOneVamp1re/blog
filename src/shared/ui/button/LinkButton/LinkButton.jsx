import classNames from 'classnames'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

import styles from './LinkButton.module.scss'
export const LinkButton = ({ action, buttonText, to }) => {
  const navigate = useNavigate()

  const classes = classNames(styles.button, styles[action])
  const handleClick = (to) => {
    navigate(to)
  }
  return (
    <button className={classes} type="button" onClick={() => handleClick(to)}>
      {buttonText}
    </button>
  )
}

LinkButton.propTypes = {
  action: PropTypes.string,
  buttonText: PropTypes.string,
  to: PropTypes.string,
}
