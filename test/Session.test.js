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
      phase: false,
    },
    nextPhases: [
      {
        id: `design-order`,
        view: `list`,
        otherViews: [],
        // this will fill with the ids of your pizzas
        arrested: true,
      },
      {
        id: `review-order`,
        view: `list`,
        arrested: false,
      },
      {
        id: `job-done`,
        view: `splash-screen`,
        arrested: false,
      },
    ],
  }
  expect(input).toEqual(expected)
})
