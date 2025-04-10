import { useParams } from 'react-router'

import { Article, useGetArticleQuery } from '@entities/Article'
import { LinkButton } from '@shared/ui/button/LinkButton'
import { ModifyButton } from '@shared/ui/button/ModifyButton'

import styles from './ArticleWidget.module.scss'
export const ArticleWidget = () => {
  const { slug } = useParams() || {}

  const { data } = useGetArticleQuery(slug)
  return (
    <section className={styles.article}>
      <Article {...data?.article} />
      <div className={styles.actions}>
        <ModifyButton action="delete-article" buttonText="Delete" cb="" />
        <LinkButton action="edit-article" buttonText="Edit" to={`/article/${slug}/edit`} />
      </div>
    </section>
  )
}
