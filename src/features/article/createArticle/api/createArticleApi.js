import { baseApi } from '@shared/API/api'

const createArticle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles',
        method: 'POST',
        body: article,
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
  overrideExisting: true,
})

export const { useCreateArticleMutation } = createArticle
