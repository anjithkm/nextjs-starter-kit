import React from 'react'
import { Provider } from 'react-redux'
import { useGetPostByIdQuery, useCreatePostMutation } from '@/services/api'
import { render, screen, waitFor } from '@testing-library/react'
import { Index } from '@/pages/index'
import { mockStore } from '@/__mock__/store'

// Mock the API slice
jest.mock('@/services/api', () => {
	const originalModule = jest.requireActual('@/services/api')
	return {
		...originalModule,
		useGetPostByIdQuery: jest.fn(),
		useCreatePostMutation: jest.fn(),
	}
})


describe('Index Page', () => {
	afterAll(() => {
		// Restore the original implementation
		jest.restoreAllMocks()
	})

	test('should render correctly', () => {
		const mockPost = { id: 1, title: 'Test Post', body: 'This is a test post.' }
		;(useGetPostByIdQuery as jest.Mock).mockReturnValue({
			data: mockPost,
			isLoading: false,
			error: null,
		})

		const mockCreatePost = jest.fn()
		;(mockCreatePost as jest.Mock).mockResolvedValue({
			data: mockPost,
			isLoading: false,
			error: null,
		})
		;(useCreatePostMutation as jest.Mock).mockReturnValue([mockCreatePost, { isLoading: false }])

		render(
			<Provider store={mockStore}>
				<Index />
			</Provider>
		)

		// expect(screen.getByText(/Hello/i)).toBeInTheDocument();
	})
})
