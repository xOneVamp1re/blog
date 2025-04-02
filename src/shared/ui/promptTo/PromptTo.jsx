import { Link } from 'react-router'
import PropTypes from 'prop-types'

import styles from './PromptTo.module.scss'

export const PromptTo = ({ to, linkTitle }) => {
  return (
    <p className={styles.prompt}>
      Already have an account?
      <Link to={to}>
        <span className={styles['prompt-link']}> {linkTitle}</span>
      </Link>
      .
    </p>
  )
}

PromptTo.propTypes = {
  to: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
}
