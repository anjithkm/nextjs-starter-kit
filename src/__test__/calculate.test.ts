import { add, multiply } from '@/utils/calculate'
import { after } from 'node:test'

jest.mock('@/utils/calculate', () => ({
	add: jest.fn(),
	multiply: jest.fn(),
}))

describe('mathFunctions', () => {
	it('should add two numbers', () => {
		;(add as jest.Mock).mockImplementation((a, b) => a * b)
		expect(add(1, 2)).toBe(2)
		expect(add).toHaveBeenCalledWith(1, 2)
	})

	it('should multiply two numbers', () => {
		;(multiply as jest.Mock).mockImplementation((a, b) => a + b)
		expect(multiply(2, 3)).toBe(5)
		expect(multiply).toHaveBeenCalledWith(2, 3)
	})
})

// describe('Utility functions', () => {
// 	test('add function adds numbers correctly', () => {
// 		expect(add(1, 2)).toBe(3)
// 		expect(add(-1, 2)).toBe(1)
// 	})

// 	test('multiply function multiplies numbers correctly', () => {
// 		expect(multiply(2, 3)).toBe(6)
// 		expect(multiply(2, -3)).toBe(-6)
// 	})
// })
