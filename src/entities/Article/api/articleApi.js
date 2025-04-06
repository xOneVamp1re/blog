import { baseApi } from '@shared/API/api'

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'GET',
      }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled
          console.log('Запрос успешно выполнен!', result)
        } catch (error) {
          console.error('Ошибка при выполнении запроса getUser:', error)
        }
      },
      transformResponse: (response) => {
        console.log(response)
        return response
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetArticleQuery } = articleApi
