import { render, screen } from '@testing-library/react'
import HomePage from '@/pages/index'

describe('Home Page', () => {
	test('renders the greeting for the home page', () => {
		render(<HomePage />)
		const greetingMessage = screen.getByText('Hello, Anjith!')
		expect(greetingMessage).toBeInTheDocument()
	})
})
