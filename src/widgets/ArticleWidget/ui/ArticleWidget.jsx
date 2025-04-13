import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

import { Article, useGetArticleQuery } from '@entities/Article'
import { LinkButton } from '@shared/ui/button/LinkButton'
import { DeleteArticle } from '@features/article/deleteArticle'
import { FavoriteArticle } from '@features/article/favoriteArticle'
import { selectApiToken, useGetUserQuery } from '@entities/User'
import { Loader } from '@shared/ui/loaders'

import styles from './ArticleWidget.module.scss'
import { Error } from './Error'
export const ArticleWidget = () => {
  const { slug } = useParams()
  const token = useSelector(selectApiToken)
  const { data, isFetching, error } = useGetArticleQuery(slug)
  const { data: userData, isFetching: isFetchingUser } = useGetUserQuery(token, { skip: !token })
  const userIsAuthor = userData?.username === data?.article.author.username
  if (error) return <Error />

  return (
    <section className={styles.article}>
      {isFetching && !isFetchingUser && (
        <div className={styles.skeleton}>
          <Loader />
        </div>
      )}
      {!isFetching && (
        <Article
          {...data?.article}
          favoriteButton={
            <FavoriteArticle
              favorited={data?.article.favorited}
              favoritesCount={data?.article.favoritesCount}
              slug={slug}
            />
          }
          actionButtons={
            userIsAuthor && (
              <>
                <DeleteArticle />
                <LinkButton action="edit-article" buttonText="Edit" to={`/article/${slug}/edit`} />
              </>
            )
          }
        />
      )}
    </section>
  )
}
