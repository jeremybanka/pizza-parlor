/* eslint max-len: 0 */

import { Session } from '../src/js/core'

test(`Set up a Session with an empty order, no coupon, and a subzero idTicker.`, () => {
  const input = new Session()
  const expected = {
    order: [],
    idTicker: -1,
    phase: {
      id: `welcome`,
      view: `splash-screen`,
    },
    nextPhases: [
      {
        id: `order-in-progress`,
        view: `list`,
        otherViews: [],
        // this will fill with the ids of your pizzas
        isUnfinished: true,
      },
      {
        id: `order-under-review`,
        view: `list`,
      },
      {
        id: `order-complete`,
        view: `splash-screen`,
      },
    ],
  }
  expect(input).toEqual(expected)
})
