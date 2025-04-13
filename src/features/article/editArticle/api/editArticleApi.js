import { baseApi } from '@shared/API/api'

const editArticle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editArticle: builder.mutation({
      query: ({ slug, data }) => {
        console.log(data)
        return {
          url: `/articles/${slug}`,
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: (result, error, { slug }) => [{ type: 'Article', id: slug }, { type: 'Articles' }],
    }),
  }),
  overrideExisting: true,
})

export const { useEditArticleMutation } = editArticle
