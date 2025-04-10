import { CreateArticle } from '@features/article/createArticle'

import styles from './CreateArticlePage.module.scss'
export const CreateArticlePage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.create}>
        <CreateArticle />
      </section>
    </main>
  )
}
