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
