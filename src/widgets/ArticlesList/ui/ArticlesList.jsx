import { Article } from '@entities/Article'

import { useGetArticlesQuery } from '../api/articlesApi'

import styles from './ArticleList.module.scss'
export const ArticlesList = () => {
  const { data } = useGetArticlesQuery()

  return (
    <ul className={styles['article-list']}>
      {data?.articles.map((el) => {
        return (
          <li className={styles['article-list-item']} key={el.slug}>
            <Article {...el} preview="true" />
          </li>
        )
      })}
    </ul>
  )
}
