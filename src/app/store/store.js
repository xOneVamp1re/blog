import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { baseApi } from '@shared/API/api'

export const rootReducer = combineSlices()

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
