import { baseApi } from '@shared/API/api'

const deleteArticle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Article', id: slug }, { type: 'Articles' }],
    }),
  }),
  overrideExisting: true,
})

export const { useDeleteArticleMutation } = deleteArticle
