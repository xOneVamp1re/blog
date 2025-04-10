import { baseApi } from '@shared/API/api'

const editArticle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editArticle: builder.mutation({
      query: (article) => ({
        url: '/articles/slug',
        method: 'POST',
        body: article,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const data = await queryFulfilled
          console.log('запрос выполнен успеншо', data)
        } catch (error) {
          console.error(error)
        }
      },
      invalidatesTags: ['Articles', 'Article'],
    }),
  }),
  overrideExisting: true,
})

export const { useEditArticleMutation } = editArticle
