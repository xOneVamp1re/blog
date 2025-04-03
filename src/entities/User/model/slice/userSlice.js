import { createSlice } from '@reduxjs/toolkit'

import { rootReducer } from '@app/store/store'

const initialState = {
  userData: null,
  isAuth: JSON.parse(localStorage.getItem('auth')) || false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload
    },
    userIsAuth: (state) => {
      state.isAuth = !state.isAuth
    },
    logoutUser: (state) => {
      state.userData = null
      state.isAuth = false
      localStorage.removeItem('auth')
    },
  },
  selectors: {
    selectUserIsAuth: (state) => state.isAuth,
  },
}).injectInto(rootReducer)

export const { userData, logoutUser, userIsAuth } = userSlice.actions
export const { selectUser, selectUserIsAuth } = userSlice.selectors
