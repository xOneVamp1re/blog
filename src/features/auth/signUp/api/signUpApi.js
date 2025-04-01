import { baseApi } from '@shared/API/api'

export const signUpUser = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUpUser: build.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useSignUpUserMutation } = signUpUser
