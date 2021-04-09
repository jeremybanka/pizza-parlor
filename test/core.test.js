import double from '../src/js/core'

test(`let's get cooking`, () => {
  const input = 1
  const expected = 2
  expect(double(input)).toEqual(expected)
})
