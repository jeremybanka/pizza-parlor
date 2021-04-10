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
      crust: 0,
      sauce: 0,
      toppings: [`Mozzarella`],
    },
    options: {
      size: [`S`, `M`, `L`],
      crust: [`Regular`, `Thin Crust`, `Deep Dish`],
      sauce: [`Tomato`, `Pesto`, `Alfredo`],
      toppings: [
        `Olive`,
        `Onion`,
        `Pepperoni`,
        `Pineapple`,
        `Sausage`,
        `Spinach`,
        `Razor Blades`,
        `Yak`,
      ],
    },
  }
  expect(input).toEqual(expected)
})
