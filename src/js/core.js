/* eslint func-names: 0 */

function Session() {
  this.order = []
  this.idTicker = -1
  this.phase = {
    id: `welcome`,
    view: `splash-screen`,
  }
  this.nextPhases = [
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
  ]
}

Session.prototype.passPhase = function () {
  const jobDone = !this.phase.isUnfinished
  if(jobDone) {
    this.nextPhases.push(this.phase)
    this.phase = this.nextPhases.shift()
  }
  return jobDone
}

Session.prototype.addToOrder = function (pizza) {
  const inWrongPhase = this.phase.id !== `order-in-progress`
  if(inWrongPhase) return false
  // throw new Error(`It's not time to add to your order.`)
  const thatsNoPizza = pizza?.constructor?.name !== `Pizza`
  if(thatsNoPizza) return false
  // throw new Error(`Sir, this is a pizza restaurant.`)
  this.idTicker += 1
  pizza.id = this.idTicker
  this.order.push(pizza)
  this.phase.otherViews.push(pizza.id)
  return true
}

Session.prototype.changeView = function (viewId) {
  const isCurrentView = this.phase.view === viewId
  if(isCurrentView) return
  const didFindOtherView = this.phase.otherViews?.includes(viewId) || false
  if(didFindOtherView) {
    this.phase.otherViews.unshift(this.phase.view)
    const idxOfNewView = this.phase.otherViews.indexOf(viewId)
    this.phase.otherViews.splice(idxOfNewView, 1)
    this.phase.view = viewId
  }
  return didFindOtherView
}

function Pizza() {
  this.id = -1
  // id -1 is a signal that this pizza
  // has not been added to an order
  this.name = `The Classic`
  this.summary = `Regular crust, tomato sauce, and mozzerella.`
  this.price = 20
  this.chosen = {
    size: 1,
    crustIdx: 1,
    sauceIdx: 0,
    toppings: [`Mozzerella`],
  }
  this.options = {
    sizes: [`S`, `M`, `L`],
    crusts: [`regular`, `thin`, `thick`],
    sauces: 0,
    toppings: [],
  }
}

export { Session, Pizza }
