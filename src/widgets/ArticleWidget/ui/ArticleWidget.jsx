import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { Article, useGetArticleQuery } from '@entities/Article'
import { LinkButton } from '@shared/ui/button/LinkButton'
import { DeleteArticle } from '@features/article/deleteArticle'
import { selectApiToken, useGetUserQuery } from '@entities/User'

import styles from './ArticleWidget.module.scss'
export const ArticleWidget = () => {
  const { slug } = useParams()
  const token = useSelector(selectApiToken)
  const { data } = useGetArticleQuery(slug)
  const { data: userData } = useGetUserQuery(token)
  const userIsAuthor = userData?.username === data?.article.author.username

  return (
    <section className={styles.article}>
      <Article
        {...data?.article}
        actionButtons={
          userIsAuthor && (
            <>
              <DeleteArticle />
              <LinkButton action="edit-article" buttonText="Edit" to={`/article/${slug}/edit`} />
            </>
          )
        }
      />
    </section>
  )
}
