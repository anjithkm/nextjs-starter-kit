import { render, screen } from '@testing-library/react'
import Home from '../pages/home'
import '@testing-library/jest-dom'

test('renders Home page correctly', () => {
	render(<Home />)
	expect(screen.getByText('Home Page')).toBeInTheDocument()
	expect(screen.getByText('Go to About')).toBeInTheDocument()
})
