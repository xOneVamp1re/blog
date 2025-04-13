import { baseApi } from '@shared/API/api'

import { userIsLoading } from '../model/slice/userSlice'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => {
        return { url: '/user', headers: { Authorization: `Bearer ${token}` } }
      },
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        dispatch(userIsLoading(true))
        try {
          await queryFulfilled
        } catch (error) {
          console.error('Ошибка при выполнении запроса getUser:', error)
        } finally {
          dispatch(userIsLoading(false))
        }
      },
      transformResponse: (response) => {
        return response.user
      },
      providesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery } = userApi
