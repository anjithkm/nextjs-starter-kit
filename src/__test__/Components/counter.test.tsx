import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect';
import Counter from '@/components/counter'

describe('Counter Component', () => {
	test('increments counter', () => {
		render(<Counter />)
		const incrementButton = screen.getByText('Increment')
		fireEvent.click(incrementButton)
		expect(screen.getByRole('status')).toHaveTextContent('Count: 1')
	})

	test('decrements counter', () => {
		render(<Counter />)
		const decrementButton = screen.getByText('Decrement')
		fireEvent.click(decrementButton)
		expect(screen.getByRole('status')).toHaveTextContent('Count: -1')
	})

	test('queries using different methods', () => {
		render(<Counter />)
		// By Text
		expect(screen.getByText('Increment')).toBeInTheDocument()

		// By Role
		expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument()

		// By Test ID
		render(<div data-testid="custom-element">Hello</div>)
		expect(screen.getByTestId('custom-element')).toHaveTextContent('Hello')

		// By Label Text (if there were any label elements)
		// expect(screen.getByLabelText('labelText')).toBeInTheDocument();

		// By Placeholder Text (for input elements with placeholder attributes)
		// render(<input placeholder="Search" />);
		// expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
	})
})
