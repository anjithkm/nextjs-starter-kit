import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import Counter from '@/components/counter'
import { store } from '@/store'


describe('Counter Component', () => {

	// beforeEach(() => {
	// 	// Restore the original implementation
	// 	jest.resetAllMocks()
	// 	jest.resetModules()
	// })

	beforeEach(() => { 
		console.log("refreshed ...")
		cleanup();  
	});
	

	test('increments counter', () => {


		render(
		<Provider store={store}>
			<Counter />
		</Provider>
	    )

		expect(screen.getByRole('status')).toHaveTextContent('Count: 0')
		const incrementButton = screen.getByText('Increment')
		fireEvent.click(incrementButton)
		expect(screen.getByRole('status')).toHaveTextContent('Count: 1')
	})

	test('decrements counter', () => {

		render(
			<Provider store={store}>
				<Counter />
			</Provider>
			)

		expect(screen.getByRole('status')).toHaveTextContent('Count: 1')

		const decrementButton = screen.getByText('Decrement')
		fireEvent.click(decrementButton)
		expect(screen.getByRole('status')).toHaveTextContent('Count: 0')
		fireEvent.click(decrementButton)
		expect(screen.getByRole('status')).toHaveTextContent('Count: -1')
	})

	test('queries using different methods', () => {

		render(
			<Provider store={store}>
				<Counter />
			</Provider>
			)

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


