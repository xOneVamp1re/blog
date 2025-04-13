import { baseApi } from '@shared/API/api'

export const favoriteAricle = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: 'Article', id: slug },
        { type: 'Articles', id: slug },
      ],
    }),
    unFavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Article', id: slug }, { type: 'Articles' }],
    }),
  }),
})

export const { useFavoriteArticleMutation, useUnFavoriteArticleMutation } = favoriteAricle
