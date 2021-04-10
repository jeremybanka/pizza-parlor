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
  const expectedPhase =  {
    id: `order-in-progress`,
    view: `list`,
    otherViews: [],
    isUnfinished: true, // oops! hold it right there, bud.
  }
  const expectedNextPhases =  [
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
  ]
  expect(output1).toBe(true)
  expect(output2).toBe(false)
  expect(sampleSession.phase).toEqual(expectedPhase)
  expect(sampleSession.nextPhases).toEqual(expectedNextPhases)
})

test(`Session changeView(currentView) returns undefined.`, () => {
  const sampleSession = new Session()
  const originalView = sampleSession.phase.view
  const output = sampleSession.changeView(originalView)
  expect(typeof output).toBe(`undefined`)
  expect(sampleSession.phase.view).toEqual(originalView)
})

test(`Session changeView(nonExistentView) returns false.`, () => {
  const sampleSession = new Session()
  const originalView = sampleSession.phase.view
  const nonExistentView = `this-view-does-not-exist`
  const output = sampleSession.changeView(nonExistentView)
  expect(output).toBe(false)
  expect(sampleSession.phase.view).toEqual(originalView)
})

test(`Session changeView(existentView) puts originalView at otherViews[0], changes view, & returns true.`, () => {
  const sampleSession = new Session()
  const originalView = sampleSession.phase.view
  const exampleView = `example-view`
  sampleSession.phase.otherViews = [exampleView]
  const output = sampleSession.changeView(exampleView)
  expect(output).toBe(true)
  expect(sampleSession.phase.view).toEqual(exampleView)
  expect(sampleSession.phase.otherViews[0]).toEqual(originalView)
})

test(`Session removeView(otherView) gets rid of that view from otherViews.`, () => {
  const sampleSession = new Session()
  const exampleView = `example-view`
  sampleSession.phase.otherViews = [exampleView]
  const output = sampleSession.removeView(exampleView)
  expect(output).toBe(true)
  expect(sampleSession.phase.otherViews).toEqual([])
})

test(`Session removeView(currentView) always does nothing and returns false.`, () => {
  const sampleSession = new Session()
  const currentView = sampleSession.phase.view
  const output = sampleSession.removeView(currentView)
  expect(output).toBe(false)
  expect(sampleSession.phase.view).toEqual(currentView)
})
