/* eslint max-len: 0 */

import { Session, Pizza } from '../src/js/core'
import { WELCOME, ORDER_IN_PROGRESS } from '../src/js/core/Session'

// i wish i could get jest to see an error in this method
// but it can't identify where the error is coming from
// and fails the test. Help!
test(`Adding a pizza outside the order-in-progress state adds nothing and returns false.`, () => {
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  const stateId = sampleSession.state.id
  const sampleOrder = sampleSession.order
  expect(stateId).toBe(WELCOME)
  expect(() => sampleSession.addToOrder(perfectPizza)).toThrow(Error)
  expect(sampleOrder).toEqual([])
})

test(`Adding non-Pizza to order returns false.`, () => {
  const sampleSession = new Session()
  sampleSession.goToNextState()
  const nonPizza = `im not even a object lol`
  const stateId = sampleSession.state.id
  const sampleOrder = sampleSession.order
  expect(() => sampleSession.addToOrder(nonPizza)).toThrow(Error)
  expect(stateId).toBe(ORDER_IN_PROGRESS)
  expect(sampleOrder).toEqual([])
})

test(`Adding a pizza during the order-in-progress state adds your pizza.`, () => {
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  sampleSession.goToNextState()
  const stateId = sampleSession.state.id
  sampleSession.addToOrder(perfectPizza)
  const sampleOrder = sampleSession.order
  expect(stateId).toBe(ORDER_IN_PROGRESS)
  expect(sampleOrder).toEqual([perfectPizza])
})

test(`Session.prototype.addPizza makes a pizza and adds it to the order`, () => {
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

test(`Session.prototype.removeFromOrder(0) removes pizza 0.`, () => {
  const sampleSession = new Session()
  sampleSession.goToNextState()
  sampleSession.addPizza()
  sampleSession.removeFromOrder(0)
  const sampleOrder = sampleSession.order
  expect(sampleOrder).toEqual([])
})
