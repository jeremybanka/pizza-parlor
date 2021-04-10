/* eslint func-names: 0 */

import Pizza from './Pizza'

export const WELCOME = `welcome`
export const ORDER_IN_PROGRESS = `order-in-progress`
export const ORDER_UNDER_REVIEW = `order-under-review`
export const ORDER_COMPLETE = `order-complete`
export const SPLASH_SCREEN = `splash-screen`
export const LIST = `list`

export default function Session() {
  this.order = []
  this.idTicker = -1
  this.state = {
    id: WELCOME,
    view: SPLASH_SCREEN,
  }
  this.nextStates = [
    {
      id: ORDER_IN_PROGRESS,
      view: LIST,
      otherViews: [], // this will fill with the ids of your pizzas
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
  ]
}

Session.prototype.goToNextState = function () {
  const jobDone = !this.state.isUnfinished
  if(jobDone) {
    this.nextStates.push(this.state)
    this.state = this.nextStates.shift()
  }
  return jobDone
}

Session.prototype.addToOrder = function (pizza) {
  const inWrongState = this.state.id !== ORDER_IN_PROGRESS
  if(inWrongState) return false
  // throw new Error(`It's not time to add to your order.`)
  const thatsNoPizza = pizza?.constructor?.name !== `Pizza`
  if(thatsNoPizza) return false
  // throw new Error(`Sir, this is a pizza restaurant.`)
  this.idTicker += 1
  pizza.id = this.idTicker
  this.order.push(pizza)
  this.state.otherViews.push(pizza.id)
  this.state.isUnfinished = false
  return true
}

Session.prototype.addPizza = function () {
  const pizza = new Pizza()
  return this.addToOrder(pizza)
}

Session.prototype.removeFromOrder = function (itemId) {
  const inWrongState = this.state.id !== ORDER_IN_PROGRESS
  if(inWrongState) return false
  const idxOfRemoval = this.order.findIndex(item => item.id === itemId)
  const didFind = idxOfRemoval !== -1
  if(didFind) {
    this.order.splice(idxOfRemoval, 1)
    this.changeView(LIST)
    this.removeView(itemId)
    const orderNowEmpty = this.order.length === 0
    if(orderNowEmpty) this.state.isUnfinished = true
  }
  return didFind
}

Session.prototype.changeView = function (viewId) {
  const isCurrentView = this.state.view === viewId
  if(isCurrentView) return
  const didFindOtherView = this.state.otherViews?.includes(viewId) || false
  if(didFindOtherView) {
    this.state.otherViews.unshift(this.state.view)
    const idxOfNewView = this.state.otherViews.indexOf(viewId)
    this.state.otherViews.splice(idxOfNewView, 1)
    this.state.view = viewId
  }
  return didFindOtherView
}

Session.prototype.removeView = function (viewId) {
  if(!this.state.otherViews) return false
  const idxOfRemoval = this.state.otherViews.indexOf(viewId)
  const didFind = idxOfRemoval !== -1
  if(didFind) this.state.otherViews.splice(idxOfRemoval, 1)
  return didFind
}
