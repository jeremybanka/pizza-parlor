/* eslint max-len: 0 */

import { Pizza } from '../src/js/core'

test(`Create an 'empty' medium Pizza with a placeholder id and no toppings.`, () => {
  const input = new Pizza()
  const expected = {
    toppings: [],
    size: `M`,
    id: -1,
  }
  expect(input).toEqual(expected)
})
