import { add, multiply } from '@/utils/calculate';

describe('Utility functions', () => {
  test('add function adds numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 2)).toBe(1);
  });

  test('multiply function multiplies numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(2, -3)).toBe(-6);
  });
});
