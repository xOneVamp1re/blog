import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@shared/API/api'

export const rootReducer = combineSlices(baseApi)

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
