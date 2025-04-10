import { ArticlesList } from '@widgets/ArticlesList'

import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <ArticlesList />
    </main>
  )
}
