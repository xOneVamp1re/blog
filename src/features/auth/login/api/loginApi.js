import { baseApi } from '@shared/API/api'
import { userIsAuth } from '@entities/User'

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
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(userIsAuth())
          localStorage.setItem('auth', true)
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error)
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useLoginUserMutation } = loginUser
