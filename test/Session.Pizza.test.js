/* eslint max-len: 0 */

import { Session, Pizza } from '../src/js/core'

// i wish i could get jest to see an error in this method
// but it can't identify where the error is coming from
// and fails the test. Help!
test(`Adding a pizza outside the order-in-progress phase adds nothing and returns false.`, () => {
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  const phaseId = sampleSession.phase.id
  const output = sampleSession.addToOrder(perfectPizza)
  const sampleOrder = sampleSession.order
  expect(phaseId).toBe(`welcome`)
  expect(output).toBe(false)
  expect(sampleOrder).toEqual([])
})

test(`Adding non-Pizza to order returns false.`, () => {
  const sampleSession = new Session()
  sampleSession.passPhase()
  const nonPizza = `im not even a object lol`
  const phaseId = sampleSession.phase.id
  const output = sampleSession.addToOrder(nonPizza)
  const sampleOrder = sampleSession.order
  expect(phaseId).toBe(`order-in-progress`)
  expect(output).toBe(false)
  expect(sampleOrder).toEqual([])
})

test(`Adding a pizza during the order-in-progress phase adds your pizza and returns true.`, () => {
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  sampleSession.passPhase()
  const phaseId = sampleSession.phase.id
  const output = sampleSession.addToOrder(perfectPizza)
  const sampleOrder = sampleSession.order
  expect(phaseId).toBe(`order-in-progress`)
  expect(output).toBe(true)
  expect(sampleOrder).toEqual([perfectPizza])
})
