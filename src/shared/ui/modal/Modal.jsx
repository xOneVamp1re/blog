import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Modal.module.scss'

export const Modal = ({ title, onOk, onCancel, children, isVisible, modalRef, customClassName = '' }) => {
  if (!isVisible) return null
  const contentClasses = classNames(styles.content, {
    [styles[`content-${customClassName}`]]: customClassName,
  })
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={contentClasses} ref={modalRef} tabIndex={-1}>
        <Modal.Header className={classNames.header} customClass={customClassName} onCancel={onCancel} title={title} />
        <Modal.Body className={classNames.body} customClass={customClassName}>
          {children}
        </Modal.Body>
        <Modal.Footer className={classNames.footer} customClass={customClassName} onOk={onOk} />
      </div>
    </div>
  )
}

Modal.Header = function ModalHeader({ onCancel, title, customClass = '' }) {
  const headerClasses = classNames(styles.header, { [styles[`header-${customClass}`]]: customClass })
  const closeButtonClasses = classNames(styles.close, { [styles[`close-${customClass}`]]: customClass })
  return (
    <div className={headerClasses}>
      {customClass ? (
        <div className={classNames(styles[`header-title-${customClass}`])}>
          <svg width="23" height="23" viewBox="0 20 497.767 446.171" xmlns="http://www.w3.org/2000/svg">
            <path
              id="path"
              d="M494.06 398.52L275.54 14.36C270.06 4.82 259.41 1.52e-5 248.75 1.52e-5C238.13 1.52e-5 227.49 4.77 222.01 14.31C222.01 14.31 10.67 385.7 3.47 398.83C-7.23 418.5 8.17 446.17 30.62 446.17L467.18 446.17C489.59 446.17 505.25 418.73 494.06 398.52Z"
              fill="#f18194"
            />
            <path
              id="path"
              d="M248.88 383.65C231.71 383.65 217.77 369.73 217.77 352.55C217.77 335.38 231.71 321.43 248.88 321.43C266.06 321.43 279.99 335.38 279.99 352.55C280 369.73 266.06 383.65 248.88 383.65ZM278.61 163.81L259.26 311.17L238.51 311.17L219.44 163.36C218.34 155.32 217.77 149.69 217.77 146.53C217.77 136.37 220.81 128.41 226.87 122.67C232.93 116.91 240.27 114.04 248.88 114.04C257.72 114.04 265.08 116.9 271.04 122.66C277.01 128.39 280 137.05 280 148.57C280 152.33 279.55 157.43 278.61 163.81Z"
              fill="#FFFFFF"
            />
          </svg>
          <h2>{title}</h2>
        </div>
      ) : (
        <h2>{title}</h2>
      )}
      <button className={closeButtonClasses} onClick={onCancel}>
        &times;
      </button>
    </div>
  )
}

Modal.Body = function ModalBody({ children, customClass = '' }) {
  const bodyClasses = classNames(styles.body, { [styles[`body-${customClass}`]]: customClass })
  return <div className={bodyClasses}>{children}</div>
}

Modal.Footer = function ModalFooter({ onOk, customClass = '' }) {
  const footerClasses = classNames(styles.footer, styles[`footer-${customClass}`])
  const buttonClasses = classNames(styles.button, styles[`button-${customClass}`])
  return (
    <div className={footerClasses}>
      <button className={buttonClasses} onClick={onOk}>
        ОК
      </button>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  modalRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  customClassName: PropTypes.object,
}
Modal.Header.propTypes = {
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  customClass: PropTypes.string,
}
Modal.Body.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
}
Modal.Footer.propTypes = {
  onOk: PropTypes.func.isRequired,
  customClass: PropTypes.string,
}
