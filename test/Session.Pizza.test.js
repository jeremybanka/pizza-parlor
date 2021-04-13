/* eslint max-len: 0 */

import { Session, Pizza } from '../src/js/core'
import { WELCOME, ORDER_IN_PROGRESS } from '../src/js/core/Session'

describe(`Session.prototype.addToOrder()`, () => {
  it(`throws error, does nothing if called in wrong state.`, () => {
    const sampleSession = new Session()
    const perfectPizza = new Pizza()
    const stateId = sampleSession.state.id
    const sampleOrder = sampleSession.order
    expect(stateId).toBe(WELCOME)
    expect(() => sampleSession.addToOrder(perfectPizza)).toThrow(Error)
    expect(sampleOrder).toEqual([])
  })
  it(`throws error, does nothing if it sees a non-Pizza.`, () => {
    const sampleSession = new Session()
    sampleSession.goToNextState()
    const nonPizza = `im not even a object lol`
    const stateId = sampleSession.state.id
    const sampleOrder = sampleSession.order
    expect(stateId).toBe(ORDER_IN_PROGRESS)
    expect(() => sampleSession.addToOrder(nonPizza)).toThrow(Error)
    expect(sampleOrder).toEqual([])
  })
  it(`adds a pizza to your order when in correct state.`, () => {
    const sampleSession = new Session()
    const perfectPizza = new Pizza()
    sampleSession.goToNextState()
    const stateId = sampleSession.state.id
    sampleSession.addToOrder(perfectPizza)
    const sampleOrder = sampleSession.order
    expect(stateId).toBe(ORDER_IN_PROGRESS)
    expect(sampleOrder).toEqual([perfectPizza])
  })
})

describe(`Session.prototype.removeFromOrder()`, () => {
  it(`Session.prototype.removeFromOrder(0) removes pizza 0.`, () => {
    const sampleSession = new Session()
    sampleSession.goToNextState()
    sampleSession.addPizza()
    sampleSession.removeFromOrder(0)
    const sampleOrder = sampleSession.order
    expect(sampleOrder).toEqual([])
  })
})

describe(`Session.prototype.addPizza()`, () => {
  it(`Session.prototype.addPizza makes a pizza and adds it to the order`, () => {
    const sampleSession = new Session()
    const perfectPizza = new Pizza()
    perfectPizza.id = 0 // simulate adding our new pizza to the order
    sampleSession.goToNextState()
    const stateId = sampleSession.state.id
    sampleSession.addPizza()
    const sampleOrder = sampleSession.order
    expect(stateId).toBe(ORDER_IN_PROGRESS)
    expect(sampleOrder).toEqual([perfectPizza])
  })
})
