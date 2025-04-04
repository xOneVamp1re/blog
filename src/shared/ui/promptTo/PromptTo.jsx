import { Link } from 'react-router'
import PropTypes from 'prop-types'

import styles from './PromptTo.module.scss'

export const PromptTo = ({ to, link, prompt }) => {
  return (
    <p className={styles.prompt}>
      {prompt}
      <Link to={to}>
        <span className={styles['prompt-link']}> {link}</span>
      </Link>
      .
    </p>
  )
}

PromptTo.propTypes = {
  to: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
}
