import { Article } from '@entities/Article'
import { PaginationArticlesList } from '@features/article/pagination'
import { FavoriteArticle } from '@features/article/favoriteArticle'
import { usePagination } from '@features/article/pagination/hooks/usePagination'
import { Loader } from '@shared/ui/loaders'

import { useGetArticlesQuery } from '../api/articlesApi'

import { Error } from './Error'
import styles from './ArticleList.module.scss'

export const ArticlesList = () => {
  const { currentPage, totalPages, handlePageChange, pageSize } = usePagination()
  const { data, isFetching, error } = useGetArticlesQuery({ limit: pageSize, offset: (currentPage - 1) * pageSize })
  if (error) return <Error />
  return (
    <section className={styles.articles}>
      {isFetching && <Loader />}
      <ul className={styles['articles-list']}>
        {data?.articles.map((el) => {
          return (
            <li className={styles['articles-list-item']} key={el.slug}>
              <Article
                {...el}
                preview="true"
                favoriteButton={
                  <FavoriteArticle favorited={el.favorited} favoritesCount={el.favoritesCount} slug={el.slug} />
                }
              />
            </li>
          )
        })}
      </ul>
      <PaginationArticlesList
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        pageSize={pageSize}
      />
    </section>
  )
}
