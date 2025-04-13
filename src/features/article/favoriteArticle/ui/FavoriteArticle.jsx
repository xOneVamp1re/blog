import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

import { useAuth } from '@shared/hooks/useAuth'

import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../api/FavoriteArticle'

import styles from './FavoriteArticle.module.scss'

export const FavoriteArticle = ({ slug, favorited, favoritesCount }) => {
  const isAuth = useAuth()
  const navigate = useNavigate()
  const [favoritedArticle] = useFavoriteArticleMutation()
  const [unFavoritedArticle] = useUnFavoriteArticleMutation()
  const handleFavorite = (favorited) => {
    if (!isAuth) return navigate('/login')
    return !favorited ? favoritedArticle(slug) : unFavoritedArticle(slug)
  }
  return (
    <button
      className={styles['favorite-btn']}
      onClick={() => {
        handleFavorite(favorited)
      }}>
      <i aria-hidden="true" className={styles.icon}>
        <svg viewBox="0 -1 16 16" className={styles['icon-heart']} xmlns="http://www.w3.org/2000/svg">
          <path
            id="Vector"
            d="M8 14.23C7.77 14.23 7.55 14.15 7.38 14C6.73 13.43 6.11 12.9 5.56 12.43L5.55 12.43C3.94 11.06 2.55 9.87 1.58 8.7C0.5 7.4 0 6.16 0 4.8C0 3.49 0.45 2.28 1.26 1.39C2.09 0.49 3.23 0 4.46 0C5.39 0 6.23 0.29 6.98 0.86C7.35 1.15 7.69 1.51 8 1.92C8.3 1.51 8.64 1.15 9.01 0.86C9.76 0.29 10.6 0 11.53 0C12.76 0 13.9 0.49 14.73 1.39C15.54 2.28 16 3.49 16 4.8C16 6.16 15.49 7.4 14.41 8.7C13.44 9.87 12.05 11.06 10.44 12.43C9.89 12.9 9.26 13.43 8.61 14C8.44 14.15 8.22 14.23 8 14.23ZM4.46 0.93C3.49 0.93 2.6 1.32 1.95 2.02C1.29 2.74 0.93 3.72 0.93 4.8C0.93 5.94 1.36 6.96 2.3 8.1C3.22 9.21 4.58 10.37 6.16 11.72L6.17 11.72C6.72 12.19 7.34 12.72 7.99 13.29C8.65 12.72 9.28 12.19 9.83 11.72C11.41 10.37 12.77 9.21 13.69 8.1C14.63 6.96 15.06 5.94 15.06 4.8C15.06 3.72 14.7 2.74 14.04 2.02C13.39 1.32 12.5 0.93 11.53 0.93C10.81 0.93 10.16 1.16 9.58 1.6C9.07 2 8.71 2.5 8.5 2.86C8.4 3.04 8.21 3.14 8 3.14C7.78 3.14 7.59 3.04 7.49 2.86C7.28 2.5 6.92 2 6.41 1.6C5.83 1.16 5.18 0.93 4.46 0.93Z"
          />
          {favorited && (
            <path d="M4.46 0.93C3.49 0.93 2.6 1.32 1.95 2.02C1.29 2.74 0.93 3.72 0.93 4.8C0.93 5.94 1.36 6.96 2.3 8.1C3.22 9.21 4.58 10.37 6.16 11.72L6.17 11.72C6.72 12.19 7.34 12.72 7.99 13.29C8.65 12.72 9.28 12.19 9.83 11.72C11.41 10.37 12.77 9.21 13.69 8.1C14.63 6.96 15.06 5.94 15.06 4.8C15.06 3.72 14.7 2.74 14.04 2.02C13.39 1.32 12.5 0.93 11.53 0.93C10.81 0.93 10.16 1.16 9.58 1.6C9.07 2 8.71 2.5 8.5 2.86C8.4 3.04 8.21 3.14 8 3.14C7.78 3.14 7.59 3.04 7.49 2.86C7.28 2.5 6.92 2 6.41 1.6C5.83 1.16 5.18 0.93 4.46 0.93Z" />
          )}
        </svg>
      </i>
      <span>{favoritesCount}</span>
    </button>
  )
}

FavoriteArticle.propTypes = {
  slug: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
}
