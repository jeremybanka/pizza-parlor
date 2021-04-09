/* eslint max-len: 0 */

import { Session } from '../src/js/core'

test(`Set up a Session with an empty order, no coupon, and a subzero idTicker.`, () => {
  const input = new Session()
  const expected = {
    order: [],
    coupon: null,
    idTicker: -1,
  }
  expect(input).toEqual(expected)
})
