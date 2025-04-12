import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

import styles from './Popup.module.scss'

export const Popup = ({ title, onOk, onCancel, children, isVisible, modalRef, position }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimatingOut(false)
      requestAnimationFrame(() => {
        setIsMounted(true)
      })
    } else {
      setIsAnimatingOut(true)
      const timer = setTimeout(() => {
        setIsMounted(false)
        setIsAnimatingOut(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!isVisible && !isMounted) return null

  const overlayClasses = classNames(styles.overlay)
  const contentClasses = classNames(styles.content, {
    [styles['content-visible']]: isVisible && isMounted,
  })
  return (
    <div
      className={overlayClasses}
      role="dialog"
      aria-modal="true"
      style={{
        top: position.top,
        left: position.left,
      }}>
      <div className={contentClasses} ref={modalRef} tabIndex={-1}>
        {title && (
          <Popup.Header className={classNames.header}>
            <h2>{title}</h2>
            <button className={styles.close} onClick={onCancel}>
              &times;
            </button>
          </Popup.Header>
        )}
        <Popup.Body className={classNames.body}>{children}</Popup.Body>
        <Popup.Footer className={classNames.footer}>
          <button className={styles.cancel} onClick={onCancel}>
            No
          </button>
          <button className={styles.confirm} onClick={onOk}>
            Yes
          </button>
        </Popup.Footer>
      </div>
    </div>
  )
}

export const PopupPortal = (props) => {
  return createPortal(<Popup {...props} />, document.getElementById('modal-root'))
}

Popup.Header = function PopupHeader({ children, className = '' }) {
  const headerClasses = classNames(styles.header, styles[className])
  return <div className={headerClasses}>{children}</div>
}

Popup.Body = function PopupBody({ children, className = '' }) {
  const bodyClasses = classNames(styles.body, styles[className])
  return <div className={bodyClasses}>{children}</div>
}

Popup.Footer = function PopupFooter({ children, className = '' }) {
  const footerClasses = classNames(styles.footer, styles[className])
  return <div className={footerClasses}>{children}</div>
}

Popup.propTypes = {
  title: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  modalRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  classNames: PropTypes.object,
}
Popup.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Popup.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Popup.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
