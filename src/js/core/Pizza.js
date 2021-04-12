/* eslint func-names: 0 */
/* eslint no-case-declarations: 0 */
/* eslint no-global-assign: 0 */

import PRICE_SHEET from './data/priceSheet'

export default function Pizza() {
  this.id = -1
  // id -1 is a signal that this pizza
  // has not been added to an order
  this.name = `The Classic`
  this.summary = `Medium pizza with tomato sauce and mozzarella.`
  this.price = 20
  this.chosen = {
    size: 1,
    crust: 0,
    sauce: 0,
    toppings: [`Mozzarella`],
  }
  this.options = {
    size: [`S`, `M`, `L`],
    crust: [`Regular`, `Thin Crust`, `Deep Dish`, `None`],
    sauce: [`Tomato`, `Pesto`, `Alfredo`, `None`],
    toppings: [
      `Olive`,
      `Onion`,
      `Pepperoni`,
      `Pineapple`,
      `Razor Blades`,
      `Sausage`,
      `Spinach`,
      `Yak`,
    ],
  }
}

Pizza.prototype.chooseOption = function (key, idx) {
  switch(key) {
    case `size`:
    case `crust`:
    case `sauce`:
      this.chosen[key] = idx
      break
    case `toppings`:
      this.addTopping(idx)
      break
    default: throw new Error(`not a valid pizza option: '${key}'`)
  }
  this.processChange()
}

Pizza.prototype.addTopping = function (idx) {
  const chosenTopping = this.options.toppings.splice(idx, 1)
  this.chosen.toppings.push(...chosenTopping)
}

Pizza.prototype.removeTopping = function (idx) {
  const chosenTopping = this.chosen.toppings.splice(idx, 1)
  this.options.toppings.push(chosenTopping[0])
  this.options.toppings.sort()
  this.processChange()
}

Pizza.prototype.processChange = function () {
  this.size = this.options.size[this.chosen.size]
  this.crust = this.options.crust[this.chosen.crust]
  this.sauce = this.options.sauce[this.chosen.sauce]
  this.tallyPrice()
  this.summarize()
  this.rename()
}

Pizza.prototype.tallyPrice = function () {
  const sizePrice = PRICE_SHEET.size[this.size]
  const crustPrice = PRICE_SHEET.crust[this.crust]
  const saucePrice = PRICE_SHEET.sauce[this.sauce]
  let toppingsPrice = 0
  for(let i = 0; i < this.chosen.toppings.length; i++) {
    const chosenTopping = this.chosen.toppings[i]
    toppingsPrice += PRICE_SHEET.toppings[chosenTopping]
  }
  const pizzaPrice = sizePrice + crustPrice + saucePrice + toppingsPrice
  this.price = pizzaPrice
  console.log(this.price)
}

Pizza.prototype.summarize = function () {
  const adjective = (() => {
    switch(this.size) {
      case `S`: return `Small`
      case `M`: return `Medium`
      case `L`: return `Large`
      default: throw new Error(`strange size: ${this.size}`)
    }
  })()
  const noun = (() => {
    switch(this.crust) {
      case `Regular`: return `pizza with`
      case `Thin Crust`: return `thin-crust pizza with`
      case `Deep Dish`: return `deep-dish pizza with`
      case `None`: return `helping of`
      default: throw new Error(`strange crust: ${this.crust}`)
    }
  })()
  const listHead = (() => {
    switch(this.sauce) {
      case `Tomato`: return `tomato sauce`
      case `Pesto`: return `pesto`
      case `Alfredo`: return `alfredo sauce`
      case `None`: return ``
      default: throw new Error(`strange sauce: ${this.sauce}`)
    }
  })()
  let chosenToppings = [...this.chosen.toppings]
  console.log(chosenToppings)
  chosenToppings = chosenToppings.map(topping => topping.toLowerCase())
  if(listHead) chosenToppings.unshift(listHead)
  const list = (() => {
    switch(chosenToppings.length) {
      case 0: return `nothing`
      case 1: return chosenToppings[0]
      case 2: return `${chosenToppings[0]} and ${chosenToppings[1]}`
      default:
        const lastTopping = chosenToppings.pop(listHead)
        const commaJoinedToppings = chosenToppings.join(`, `)
        return `${commaJoinedToppings}, and ${lastTopping}`
    }
  })()
  this.summary = `${adjective} ${noun} ${list}.`
  console.log(this.summary)
}

Pizza.prototype.rename = function () {
  const specialName = ``
  const autoNameCoreDict = {
    'Regular': {
      'Tomato': { infix: `Classic` },
      'Pesto': { infix: `Gardener` },
      'Alfredo': { infix: `Gourmet` },
      'None': { prefix: `Open-faced`, suffix: `Pita` },
    },
    'Thin Crust': {
      'Tomato': { infix: `New Yorker` },
      'Pesto': { infix: `Luigi` },
      'Alfredo': { infix: `Mafioso` },
      'None': { prefix: `Huge`, infix: `Cracker` },
    },
    'Deep Dish': {
      'Tomato': { infix: `Mario` },
      'Pesto': { infix: `Shrek` },
      'Alfredo': { infix: `Royale` },
      'None': { prefix: `Bready`, infix: `Slab` },
    },
    'None': {
      'Tomato': { prefix: `Messy` },
      'Pesto': { prefix: `Mossy` },
      'Alfredo': { prefix: `Buttered` },
      'None': { suffix: `Extravaganza` },
    },
  }

  const autoNameCore = autoNameCoreDict[this.crust][this.sauce]
  const autoNameSupport = (() => {
    const chosen = this.chosen.toppings
    const lastChosen = chosen[chosen.length - 1]
    const nonVeganToppings = [`Mozzarella`, `Pepperoni`, `Sausage`]
    const veggieToppings = [`Olive`, `Onion`, `Spinach`]
    const meatToppings = [`Pepperoni`, `Sausage`]
    let prefix = `The`
    let infix = `Table`
    let suffix = ``

    if(lastChosen && lastChosen !== `Mozzarella`) {
      infix = lastChosen; suffix = `with ${lastChosen}`
    }
    if(chosen._excludes(`Mozzarella`)) {
      prefix = `Uncheesed`
    } else if(this.crust === `None`) { prefix = `Ooey-gooey` }
    if(chosen._excludes(nonVeganToppings)) { prefix = `Vegan` }

    if(chosen._overlaps(veggieToppings) > 1 && chosen._overlaps(meatToppings)) {
      prefix = `Super`; infix = `Combo`
    }
    if(chosen._overlaps(veggieToppings) > 1) {
      infix = `Veggie`; suffix = `with Veggies`
    }
    if(chosen._contains(meatToppings)) { infix = `Meat`; suffix = `with Meats` }
    if(chosen.includes(`Pineapple`)) { suffix = `(Island-Style)` }
    if(chosen.includes(`Razor Blades`)) {
      prefix = `Lethal`; infix = `Shrapnel`
      if(chosen.length > 2) { infix = `Garbage Pile` }
    }
    return { prefix, infix, suffix }
  })()

  if(specialName) {
    this.name = specialName
  } else {
    const { prefix, infix, suffix } = { ...autoNameSupport, ...autoNameCore }
    const autoName = `${prefix} ${infix} ${suffix}`
    this.name = autoName.trim()
  }
  console.log(this.chosen)
  console.log(this.name)
}
