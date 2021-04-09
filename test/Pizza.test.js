/* eslint max-len: 0 */

import { Pizza } from '../src/js/core'

test(`Create an 'empty' medium Pizza with a placeholder id and no toppings.`, () => {
  const input = new Pizza()
  const expected = {
    id: -1,
    name: `The Classic`,
    summary: `Regular crust, tomato sauce, and mozzerella.`,
    price: 20,
    chosen: {
      size: 1,
      crustIdx: 1,
      sauceIdx: 0,
      toppings: [`Mozzerella`],
    },
    options: {
      sizes: [`S`, `M`, `L`],
      crusts: [`regular`, `thin`, `thick`],
      sauces: 0,
      toppings: [],
    },
  }
  expect(input).toEqual(expected)
})
