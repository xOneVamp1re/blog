import { useParams } from 'react-router'

import { Article, useGetArticleQuery } from '@entities/Article'

import styles from './ArticleWidget.module.scss'
export const ArticleWidget = () => {
  const { slug } = useParams() || {}

  const { data } = useGetArticleQuery(slug)
  return (
    <section className={styles.article}>
      <Article {...data?.article} />
    </section>
  )
}
