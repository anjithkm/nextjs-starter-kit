import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { counter } from '@/services/slice/counter'
import { api } from '@/services/api' 

// Define the store
export const mockStore = configureStore({
	reducer: combineReducers({
		[api.reducerPath]: api.reducer,
		[counter.name]: counter.reducer,
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})