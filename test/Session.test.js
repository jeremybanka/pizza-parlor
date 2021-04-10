/* eslint max-len: 0 */

import { Session } from '../src/js/core'
import { WELCOME,
  ORDER_IN_PROGRESS,
  ORDER_UNDER_REVIEW,
  ORDER_COMPLETE,
  SPLASH_SCREEN,
  LIST } from '../src/js/core/Session'

test(`Construct a Session with an empty order, no coupon, and a subzero idTicker.`, () => {
  const sampleSession = new Session()
  const expected = {
    order: [],
    idTicker: -1,
    state: {
      id: WELCOME,
      view: SPLASH_SCREEN,
    },
    nextStates: [
      {
        id: ORDER_IN_PROGRESS,
        view: LIST,
        otherViews: [],
        // this will fill with the ids of your pizzas
        isUnfinished: true,
      },
      {
        id: ORDER_UNDER_REVIEW,
        view: LIST,
      },
      {
        id: ORDER_COMPLETE,
        view: SPLASH_SCREEN,
      },
    ],
  }
  expect(sampleSession).toEqual(expected)
})

test(`Pass into next state of session.`, () => {
  const sampleSession = new Session()
  const output = sampleSession.goToNextState()
  const expected = {
    order: [],
    idTicker: -1,
    state: {
      id: ORDER_IN_PROGRESS,
      view: LIST,
      otherViews: [],
      // we got to this state, but what happens next?
      isUnfinished: true,
    },
    nextStates: [
      {
        id: ORDER_UNDER_REVIEW,
        view: LIST,
      },
      {
        id: ORDER_COMPLETE,
        view: SPLASH_SCREEN,
      },
      {
        id: WELCOME,
        view: SPLASH_SCREEN,
      },
    ],
  }
  expect(output).toBe(true)
  expect(sampleSession).toEqual(expected)
})

test(`Session won't pass unfinished state.`, () => {
  const sampleSession = new Session()
  const output1 = sampleSession.goToNextState()
  const output2 = sampleSession.goToNextState() // let's try to go two states forward
  const expectedState =  {
    id: ORDER_IN_PROGRESS,
    view: LIST,
    otherViews: [],
    isUnfinished: true, // oops! hold it right there, bud.
  }
  const expectedNextStates =  [
    {
      id: ORDER_UNDER_REVIEW,
      view: LIST,
    },
    {
      id: ORDER_COMPLETE,
      view: SPLASH_SCREEN,
    },
    {
      id: WELCOME,
      view: SPLASH_SCREEN,
    },
  ]
  expect(output1).toBe(true)
  expect(output2).toBe(false)
  expect(sampleSession.state).toEqual(expectedState)
  expect(sampleSession.nextStates).toEqual(expectedNextStates)
})

test(`Session changeView(currentView) returns undefined.`, () => {
  const sampleSession = new Session()
  const originalView = sampleSession.state.view
  const output = sampleSession.changeView(originalView)
  expect(typeof output).toBe(`undefined`)
  expect(sampleSession.state.view).toEqual(originalView)
})

test(`Session changeView(nonExistentView) returns false.`, () => {
  const sampleSession = new Session()
  const originalView = sampleSession.state.view
  const nonExistentView = `this-view-does-not-exist`
  const output = sampleSession.changeView(nonExistentView)
  expect(output).toBe(false)
  expect(sampleSession.state.view).toEqual(originalView)
})

test(`Session changeView(existentView) puts originalView at otherViews[0], changes view, & returns true.`, () => {
  const sampleSession = new Session()
  const originalView = sampleSession.state.view
  const exampleView = `example-view`
  sampleSession.state.otherViews = [exampleView]
  const output = sampleSession.changeView(exampleView)
  expect(output).toBe(true)
  expect(sampleSession.state.view).toEqual(exampleView)
  expect(sampleSession.state.otherViews[0]).toEqual(originalView)
})

test(`Session removeView(otherView) gets rid of that view from otherViews.`, () => {
  const sampleSession = new Session()
  const exampleView = `example-view`
  sampleSession.state.otherViews = [exampleView]
  const output = sampleSession.removeView(exampleView)
  expect(output).toBe(true)
  expect(sampleSession.state.otherViews).toEqual([])
})

test(`Session removeView(currentView) always does nothing and returns false.`, () => {
  const sampleSession = new Session()
  const currentView = sampleSession.state.view
  const output = sampleSession.removeView(currentView)
  expect(output).toBe(false)
  expect(sampleSession.state.view).toEqual(currentView)
})
