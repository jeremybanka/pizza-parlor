/* eslint max-len: 0 */

import { Session } from '../src/js/core'

test(`Construct a Session with an empty order, no coupon, and a subzero idTicker.`, () => {
  const sampleSession = new Session()
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
  expect(sampleSession).toEqual(expected)
})

test(`Pass into next phase of session.`, () => {
  const sampleSession = new Session()
  const output = sampleSession.passPhase()
  const expected = {
    order: [],
    idTicker: -1,
    phase: {
      id: `order-in-progress`,
      view: `list`,
      otherViews: [],
      // we got to this phase, but what happens next?
      isUnfinished: true,
    },
    nextPhases: [
      {
        id: `order-under-review`,
        view: `list`,
      },
      {
        id: `order-complete`,
        view: `splash-screen`,
      },
      {
        id: `welcome`,
        view: `splash-screen`,
      },
    ],
  }
  expect(output).toBe(true)
  expect(sampleSession).toEqual(expected)
})

test(`Session won't pass unfinished phase.`, () => {
  const sampleSession = new Session()
  const output1 = sampleSession.passPhase()
  const output2 = sampleSession.passPhase() // let's try to go two phases forward
  const expected = {
    order: [],
    idTicker: -1,
    phase: {
      id: `order-in-progress`,
      view: `list`,
      otherViews: [],
      isUnfinished: true, // oops! hold it right there, bud.
    },
    nextPhases: [
      {
        id: `order-under-review`,
        view: `list`,
      },
      {
        id: `order-complete`,
        view: `splash-screen`,
      },
      {
        id: `welcome`,
        view: `splash-screen`,
      },
    ],
  }
  expect(output1).toBe(true)
  expect(output2).toBe(false)
  expect(sampleSession).toEqual(expected)
})
