// import { renderHook } from '@testing-library/react-hooks';
import { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } from '@/services/api'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/services/api'
import React from 'react'

// Mock the API slice
jest.mock('@/services/api', () => {
	const originalModule = jest.requireActual('@/services/api')
	return {
		...originalModule,
		useGetPostsQuery: jest.fn(),
		useGetPostByIdQuery: jest.fn(),
		useCreatePostMutation: jest.fn(),
	}
})

// Create a mock store
const mockStore = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

// Helper to wrap hooks with Redux provider
// const wrapper = ({ children }: { children: React.ReactNode }) => (
//   <Provider store={mockStore}>{children}</Provider>
// );

describe('RTK Query Mocking', () => {
	test('should mock useGetPostsQuery', () => {
		const mockData = [{ id: 1, title: 'Test Post', body: 'This is a test post.' }]
		;(useGetPostsQuery as jest.Mock).mockReturnValue({
			data: mockData,
			isLoading: false,
			error: null,
		})

		// const { result } = renderHook(() => useGetPostsQuery(), { wrapper });

		// expect(result.current.data).toEqual(mockData);
		// expect(result.current.isLoading).toBe(false);
	})

	test('should mock useGetPostByIdQuery', () => {
		const mockPost = { id: 1, title: 'Test Post', body: 'This is a test post.' }
		;(useGetPostByIdQuery as jest.Mock).mockReturnValue({
			data: mockPost,
			isLoading: false,
			error: null,
		})

		// const { result } = renderHook(() => useGetPostByIdQuery('1'), { wrapper });

		// expect(result.current.data).toEqual(mockPost);
		// expect(result.current.isLoading).toBe(false);
	})

	test('should mock useCreatePostMutation', async () => {
		const mockCreatePost = jest.fn()
		;(useCreatePostMutation as jest.Mock).mockReturnValue([mockCreatePost, { isLoading: false }])

		// const { result } = renderHook(() => useCreatePostMutation(), { wrapper });
		// const createPost = result.current[0];

		// await createPost({ title: 'New Post', body: 'This is a new post.' });

		// expect(mockCreatePost).toHaveBeenCalledWith({ title: 'New Post', body: 'This is a new post.' });
	})
})
