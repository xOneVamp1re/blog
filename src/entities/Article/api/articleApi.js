import { baseApi } from '@shared/API/api'

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'GET',
      }),
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
      providesTags: ['Article'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetArticleQuery } = articleApi
