import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './Modal.module.scss'

export const Modal = ({ title, onOk, onCancel, children, isVisible, modalRef, classNames = {} }) => {
  if (!isVisible) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.content} ref={modalRef} tabIndex={-1}>
        <Modal.Header className={classNames.header}>
          <h2>{title}</h2>
          <button className={styles.close} onClick={onCancel}>
            &times;
          </button>
        </Modal.Header>
        <Modal.Body className={classNames.body}>{children}</Modal.Body>
        <Modal.Footer className={classNames.footer}>
          <button className={styles.button} onClick={onOk}>
            ОК
          </button>
        </Modal.Footer>
      </div>
    </div>
  )
}

Modal.Header = function ModalHeader({ children, className }) {
  const headerClasses = classNames(styles.header, styles[className])
  return <div className={headerClasses}>{children}</div>
}

Modal.Body = function ModalBody({ children, className }) {
  const bodyClasses = classNames(styles.body, styles[className])
  return <div className={bodyClasses}>{children}</div>
}

Modal.Footer = function ModalFooter({ children, className }) {
  const footerClasses = classNames(styles.footer, styles[className])
  return <div className={footerClasses}>{children}</div>
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  modalRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  classNames: PropTypes.object,
}
Modal.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Modal.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Modal.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
