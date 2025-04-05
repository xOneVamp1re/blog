import { createSlice } from '@reduxjs/toolkit'

import { rootReducer } from '@app/store/store'

const initialState = {
  isAuth: JSON.parse(localStorage.getItem('auth')) || false,
  isUserLoading: false,
  isUserAvatarLoading: false,
  apiToken: localStorage.getItem('token') || null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userIsAuth: (state) => {
      state.isAuth = !state.isAuth
    },
    logoutUser: (state) => {
      state.isAuth = false
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
    },
    userIsLoading: (state, action) => {
      state.isLoadingUser = action.payload
    },
    apiToken: (state, action) => {
      state.apiToken = action.payload
    },
    userAvatarIsLoading: (state, action) => {
      state.isUserAvatarLoading = action.payload
    },
  },
  selectors: {
    selectUserIsAuth: (state) => state.isAuth,
    selectUserIsLoading: (state) => state.isLoadingUser,
    selectApiToken: (state) => state.apiToken,
    selectUserAvatarIsLoading: (state) => state.isUserAvatarLoading,
  },
}).injectInto(rootReducer)

export const { userIsLoading, logoutUser, userIsAuth, apiToken, userAvatarIsLoading } = userSlice.actions
export const { selectUserIsLoading, selectUserIsAuth, selectApiToken, selectUserAvatarIsLoading } = userSlice.selectors
