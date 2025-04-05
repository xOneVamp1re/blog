import { baseApi } from '@shared/API/api'
import { apiToken, userIsAuth } from '@entities/User'

export const loginUser = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: {
              user: { token },
            },
          } = await queryFulfilled
          localStorage.setItem('token', token)
          dispatch(apiToken(token))
          dispatch(userIsAuth())
          localStorage.setItem('auth', true)
        } catch (error) {
          console.error('Ошибка при выполнении запроса login:', error)
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
})

export const { useLoginUserMutation } = loginUser
