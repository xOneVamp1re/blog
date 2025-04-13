import { userAvatarIsLoading } from '@entities/User'
import { baseApi } from '@shared/API/api'

export const editProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (data) => ({
        url: '/user',
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(baseApi.util.invalidateTags(['User']))
          dispatch(userAvatarIsLoading(true))
        } catch (err) {
          console.error(err)
        }
      },
      transformErrorResponse: (response) => {
        return response.data
      },
      // invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
})

export const { useEditProfileMutation } = editProfileApi
