import { EditArticle } from '@features/article/editArticle'

import styles from './EditArticlePage.module.scss'
export const EditArticlePage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.edit}>
        <EditArticle />
      </section>
    </main>
  )
}
