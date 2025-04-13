import { baseApi } from '@shared/API/api'

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response
      },
      providesTags: (result, error, slug) => {
        return error ? [] : [{ type: 'Article', id: slug }]
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetArticleQuery } = articleApi
