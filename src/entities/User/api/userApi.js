import { baseApi } from '@shared/API/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/user',
    }),
    onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
      try {
        const result = await queryFulfilled
        console.log('Запрос успешно выполнен!', result)
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
      }
    },
  }),
})
