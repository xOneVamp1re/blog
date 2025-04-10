import { baseApi } from '@shared/API/api'
export const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query({
      query: ({ limit = 5, offset = 0 } = {}) => {
        return {
          url: `/articles?limit=${limit}&offset=${offset}`,
        }
      },
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          console.log('Запрос успешно выполнен!', data)
        } catch (e) {
          console.log('Ошибка', e)
        }
      },
      transformResponse: (response) => {
        return response
      },
      providesTags: ['Articles'],
      keepUnusedDataFor: 10,
    }),
  }),
  overrideExisting: true,
})

export const { useGetArticlesQuery, useGetArticleQuery, useCreateArticleMutation } = articlesApi
