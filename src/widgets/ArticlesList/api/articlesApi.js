import { baseApi } from '@shared/API/api'
export const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query({
      query: () => ({
        url: '/articles',
      }),
    }),
    getArticle: build.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
    createArticle: build.mutation({
      query: (article) => ({
        method: 'POST',
        url: '/articles',
        body: article,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetArticlesQuery, useGetArticleQuery, useCreateArticleMutation } = articlesApi
