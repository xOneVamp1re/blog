import { baseApi } from '@shared/API/api'
import { userData, userIsAuth } from '@entities/User'

export const loginUser = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
      // invalidatesTags: [{ type: 'user', id: 'login' }],
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const {
            data: { user },
          } = await queryFulfilled
          dispatch(userIsAuth())
          dispatch(userData(user))
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
