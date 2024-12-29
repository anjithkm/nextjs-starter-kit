import { render, screen } from '@testing-library/react'
import Greeting from '@/components/greeting'

describe('Greeting Component', () => {
	test('renders a greeting message', () => {
		render(<Greeting name="John" />)
		const greetingElement = screen.getByText(/hello, john!/i)
		expect(greetingElement).toBeInTheDocument()
	})
})
