// import PropTypes from 'prop-types'

import { ArticleWidget } from '@widgets/ArticleWidget'

import styles from './ArticlePage.module.scss'
export const ArticlePage = () => {
  return (
    <main className={styles.main}>
      <ArticleWidget />
    </main>
  )
}
