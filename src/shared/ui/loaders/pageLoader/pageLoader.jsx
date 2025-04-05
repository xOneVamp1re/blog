import { createPortal } from 'react-dom'

import styles from './pageLoader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  )
}
export const PageLoader = () => {
  return createPortal(<Loader />, document.getElementById('loader-root'))
}
