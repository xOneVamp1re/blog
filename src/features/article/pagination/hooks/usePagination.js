import { useState } from 'react'

import { useGetArticlesQuery } from '@widgets/ArticlesList/api/articlesApi'

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem('pagination-current-page')
    return savedPage ? parseInt(savedPage) : 1
  })
  const pageSize = 5
  const { data } = useGetArticlesQuery({ limit: pageSize, offset: (currentPage - 1) * pageSize })
  const totalPages = data?.articlesCount

  const handlePageChange = (page) => {
    setCurrentPage(page)
    sessionStorage.setItem('pagination-current-page', page)
  }
  return { currentPage, totalPages, handlePageChange, pageSize }
}
