import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { counter } from '@/services/slice/counter'
import { api } from '@/services/api' // Import RTK Query API

// Define the store
export const store = configureStore({
	reducer: combineReducers({
		[api.reducerPath]: api.reducer,
		[counter.name]: counter.reducer,
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
	devTools: process.env.NODE_ENV !== 'production',
})

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Optional: Enable refetch on focus/reconnect
setupListeners(store.dispatch)

export default store
