import { skipToken } from '@reduxjs/toolkit/query'

import { useGetArticlesQuery, useGetArticleQuery, useCreateArticleMutation } from '../api/articlesApi'

export const ArticlesList = () => {
  const { data, status, isLoading } = useGetArticlesQuery()
  console.log(data)
  console.log(status)
  console.log(isLoading)
  const slug = 'bred-2-obm0xg'
  const { data: articleData, isLoading: isArticleLoading } = useGetArticleQuery(slug ?? skipToken)
  const article = articleData?.article
  console.log(article)
  console.log(isArticleLoading)
  const body = {
    title: 'Article 1',
    description: 'This is a description',
    body: 'This is a body',
    tags: ['tag1', 'tag2'],
  }
  const info = useCreateArticleMutation(body)
  console.log(info)
  return (
    <div className="articles-list">
      <h2>Articles List</h2>
    </div>
  )
}
