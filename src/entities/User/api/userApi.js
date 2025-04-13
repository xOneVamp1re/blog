import { baseApi } from '@shared/API/api'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => {
        return { url: '/user', headers: { Authorization: `Bearer ${token}` } }
      },
      transformResponse: (response) => {
        return response.user
      },
      providesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery } = userApi
