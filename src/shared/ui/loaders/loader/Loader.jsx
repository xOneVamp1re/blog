import { createPortal } from 'react-dom'

import styles from './Loader.module.scss'

const Looader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  )
}
export const Loader = () => {
  return createPortal(<Looader />, document.getElementById('loader-root'))
}
