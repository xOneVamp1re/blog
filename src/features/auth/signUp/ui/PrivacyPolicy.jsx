import PropTypes from 'prop-types'

import styles from './SignUp.module.scss'

export const PrivacyPolicy = ({ validation = {} }) => {
  return (
    <div className={styles['form-privacy-policy']}>
      <input
        className={styles['form-privacy-policy-checkbox']}
        type="checkbox"
        id="agree"
        {...validation}
        defaultChecked
      />
      <label className={styles['form-privacy-policy-text']} htmlFor="agree">
        I agree to the processing of my personal information.
      </label>
    </div>
  )
}

PrivacyPolicy.propTypes = {
  validation: PropTypes.object,
}
