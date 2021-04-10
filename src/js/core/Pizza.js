/* eslint func-names: 0 */
/* eslint no-case-declarations: 0 */

import PRICE_SHEET from './data/priceSheet'

export default function Pizza() {
  this.id = -1
  // id -1 is a signal that this pizza
  // has not been added to an order
  this.name = `The Classic`
  this.summary = `Regular crust, tomato sauce, and mozzerella.`
  this.price = 20
  this.chosen = {
    size: 1,
    crust: 0,
    sauce: 0,
    toppings: [`Mozzarella`],
  }
  this.options = {
    size: [`S`, `M`, `L`],
    crust: [`Regular`, `Thin Crust`, `Deep Dish`],
    sauce: [`Tomato`, `Pesto`, `Alfredo`],
    toppings: [
      `Olive`,
      `Onion`,
      `Pepperoni`,
      `Pineapple`,
      `Sausage`,
      `Spinach`,
      `Razor Blades`,
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
    case `topping`:
      this.addTopping(idx)
      break
    default: return false
  }
  this.processChange()
}

Pizza.prototype.addTopping = function (idx) {
  const chosenTopping = this.options.toppings.splice(idx, 1)
  this.chosen.toppings.push(chosenTopping)
}

Pizza.prototype.removeTopping = function (idx) {
  const chosenTopping = this.chosen.toppings.splice(idx, 1)
  this.options.toppings.push(chosenTopping)
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
      default: throw new Error(`strange crust`)
    }
  })()
  const listHead = (() => {
    switch(this.sauce) {
      case `Tomato`: return `tomato sauce`
      case `Pesto`: return `pesto`
      case `Alfredo`: return `alfredo sauce`
      case `None`: return ``
      default: throw new Error(`strange sauce`)
    }
  })()
  let chosenToppings = [...this.chosen.toppings]
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
  return !!this.summary
}

Pizza.prototype.rename = function () {
  let specialName = ``
  let core = ``
  let prefix = ``
  let suffix = ``
  switch(this.crust) {
    case `Regular`:
      switch(this.sauce) {
        case `Tomato`: core = `Classic`; break
        case `Pesto`: core = `Gardener`; break
        case `Alfredo`: core = `Gourmet`; break
        case `None`: prefix = `Open-faced`; suffix = `Sandwich`; break
        default:
      } break
    case `Thin Crust`:
      switch(this.sauce) {
        case `Tomato`: core = `New Yorker`; break
        case `Pesto`: core = `Luigi`; break
        case `Alfredo`: core = `Mafioso`; break
        case `None`: prefix = `Open-faced`; suffix = `Pita`; break
        default:
      } break
    case `Deep Dish`:
      switch(this.sauce) {
        case `Tomato`: core = `Mario`; break
        case `Pesto`: core = `Shrek`; break
        case `Alfredo`: core = `Gourmond`; break
        case `None`: prefix = `Bread Hunk`; break
        default:
      } break
    case `None`:
      switch(this.sauce) {
        case `Tomato`: prefix = `Messy`; break
        case `Pesto`: prefix = `Mossy`; break
        case `Alfredo`: prefix = `Buttered`; break
        case `None`: suffix = `Extravaganza`; break
        default:
      } break

    default: throw new Error(`strange crust`)
  }
  const complement = (() => {
    const chosenToppings = this.chosen.toppings
    switch(chosenToppings.length) {
      case 0:
        if(suffix === `Extravaganza`) {
          switch(this.size) {
            case `S`: specialName = `Free Money??`; break
            case `M`: specialName = `The Void`; break
            case `L`: specialName = `Black Hole`; break
            default:
          }
        } else {
          return { prefix: `Vegan` }
        }
        break
      case 1:
        const singleTopping = chosenToppings[0]
        switch(singleTopping) {
          case `Olive`:
          case `Onion`:
          case `Pepperoni`:
          case `Pineapple`:
          case `Sausage`:
          case `Spinach`:
          case `Yak`: return {
            core: singleTopping,
            suffix: `with ${singleTopping}`,
          }
          case `Mozzarella`: return {
            prefix: `The`,
            core: `Cheese`,
            suffix: `with Cheese`,
          }
          case `Razor Blades`: return {
            prefix: `Dangerous`,
            core: `Blades`,
            suffix: `with Blades`,
          }
          default: throw new Error(`strange topping: ${singleTopping}`)
        }
      default:
    }
  })()
  if(specialName) {
    this.name = specialName
  }
  const generatedName = (() => {
    switch(`${!!prefix} ${!!core} ${!!suffix}`) {
      case `false false true`: return `${complement.core} ${suffix}`
      case `true false false`: return `${prefix} ${complement.core}`
      case `false true false`: return `${complement.prefix} ${core}`
      case `true false true`: return `${prefix} ${complement.core} ${suffix}`
      default: return false
    }
  })()
  this.name = generatedName
}
