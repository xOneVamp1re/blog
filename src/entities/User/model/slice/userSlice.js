import { createSlice } from '@reduxjs/toolkit'

import { rootReducer } from '@app/store/store'

const initialState = {
  user: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.loading = false
      state.user = action.payload
    },
    loginFailed(state, action) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.loading = false
      state.error = null
    },
  },
  selectors: {
    selectUser: (state) => state.user,
  },
}).injectInto(rootReducer)

export const { loginRequest, loginSuccess, loginFailed, logout } = userSlice.actions
export const { selectUser } = userSlice.selectors
