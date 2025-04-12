import { baseApi } from '@shared/API/api'

const deleteArticle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const data = await queryFulfilled
          console.log('запрос выполнен успеншо', data)
        } catch (error) {
          console.error(error)
        }
      },
      invalidatesTags: ['Articles'],
    }),
  }),
  overrideExisting: true,
})

export const { useDeleteArticleMutation } = deleteArticle
