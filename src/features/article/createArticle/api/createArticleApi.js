import { baseApi } from '@shared/API/api'

const createArticle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles',
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
      invalidatesTags: ['Articles'],
    }),
  }),
  overrideExisting: true,
})

export const { useCreateArticleMutation } = createArticle
