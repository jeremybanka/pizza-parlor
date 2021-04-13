/* eslint max-len: 0 */

import { Session } from '../src/js/core'
import { WELCOME,
  ORDER_IN_PROGRESS,
  ORDER_UNDER_REVIEW,
  ORDER_COMPLETE,
  SPLASH_SCREEN,
  LIST } from '../src/js/core/Session'

describe(`new Session()`, () => {
  it(`Constructs a Session with an empty order, no coupon, and a subzero idTicker.`, () => {
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
})

describe(`Session.prototype.goToNextState()`, () => {
  it(`Passes into next state of session.`, () => {
    const sampleSession = new Session()
    sampleSession.goToNextState()
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
    expect(sampleSession).toEqual(expected)
  })
  it(`Won't pass unfinished state.`, () => {
    const sampleSession = new Session()
    sampleSession.goToNextState()
    sampleSession.goToNextState() // let's try to go two states forward
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
    expect(sampleSession.state).toEqual(expectedState)
    expect(sampleSession.nextStates).toEqual(expectedNextStates)
  })
})

describe(`Session.prototype.changeView()`, () => {
  it(`Does nothing if you try to change to your current view.`, () => {
    const sampleSession = new Session()
    const originalView = sampleSession.state.view
    sampleSession.changeView(originalView)
    expect(sampleSession.state.view).toEqual(originalView)
  })
  it(`Throws error if you try to change to a nonexistent view.`, () => {
    const sampleSession = new Session()
    const originalView = sampleSession.state.view
    const nonExistentView = `this-view-does-not-exist`
    expect(() => sampleSession.changeView(nonExistentView)).toThrow(Error)
    expect(sampleSession.state.view).toEqual(originalView)
  })
  it(`Puts originalView at otherViews[0], changes view to desired, other, extant view.`, () => {
    const sampleSession = new Session()
    const originalView = sampleSession.state.view
    const exampleView = `example-view`
    sampleSession.state.otherViews = [exampleView]
    sampleSession.changeView(exampleView)
    expect(sampleSession.state.view).toEqual(exampleView)
    expect(sampleSession.state.otherViews[0]).toEqual(originalView)
  })
})

describe(`Session.prototype.removeView()`, () => {
  it(`Gets rid of other view from otherViews.`, () => {
    const sampleSession = new Session()
    const exampleView = `example-view`
    sampleSession.state.otherViews = [exampleView]
    sampleSession.removeView(exampleView)
    expect(sampleSession.state.otherViews).toEqual([])
  })
  it(`Errors, does nothing if you try to remove current view.`, () => {
    const sampleSession = new Session()
    const currentView = sampleSession.state.view
    expect(() => sampleSession.removeView(currentView)).toThrow(Error)
    expect(sampleSession.state.view).toEqual(currentView)
  })
})
