import { Article } from '@entities/Article'
import { PaginationArticlesList } from '@features/article/pagination'
import { usePagination } from '@features/article/pagination/hooks/usePagination'
import { Loader } from '@shared/ui/loaders'

import { useGetArticlesQuery } from '../api/articlesApi'

import styles from './ArticleList.module.scss'
export const ArticlesList = () => {
  const { currentPage, totalPages, handlePageChange, pageSize } = usePagination()
  const { data, isFetching } = useGetArticlesQuery({ limit: pageSize, offset: (currentPage - 1) * pageSize })

  console.log(isFetching)
  return (
    <section className={styles.articles}>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <ul className={styles['articles-list']}>
            {data?.articles.map((el) => {
              return (
                <li className={styles['articles-list-item']} key={el.slug}>
                  <Article {...el} preview="true" />
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
        </>
      )}
    </section>
  )
}
