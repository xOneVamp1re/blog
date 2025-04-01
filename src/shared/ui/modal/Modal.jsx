import PropTypes from 'prop-types'

import styles from './Modal.module.scss'

export const Modal = ({ title, onOk, onCancel, children, isVisible, modalRef }) => {
  if (!isVisible) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.content} ref={modalRef} tabIndex={-1}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.close} onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          {/*    <button className={styles.button} onClick={onCancel}>
            Отмена
          </button> */}
          <button className={styles.button} onClick={onOk}>
            ОК
          </button>
        </div>
      </div>
    </div>
  )
}
