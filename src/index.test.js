const sum = require('./index');

describe('main', () => {
  test('sums two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
