/* eslint max-len: 0 */

import { Pizza } from '../src/js/core'
import extend from '../src/js/core/extensions'
import { _contains, _comprises, _overlaps, _excludes } from '../src/js/core/extensions/array'

extend(Array).with(_contains, _comprises, _overlaps, _excludes)

test(`Create an 'empty' medium Pizza with a placeholder id and no toppings.`, () => {
  const input = new Pizza()
  const expected = {
    id: -1,
    name: `The Classic`,
    summary: `Medium pizza with tomato sauce and mozzarella.`,
    price: 20,
    chosen: {
      size: 1,
      crust: 0,
      sauce: 0,
      toppings: [`Mozzarella`],
    },
    options: {
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
    },
  }
  expect(input).toEqual(expected)
})

describe(`Pizza.prototype.chooseOption()`, () => {
  it(`changes an aspect of a pizza, causing cascading changes`, () => {
    const pizza = new Pizza()
    const originalChosenCrust = pizza.chosen.crust
    const originalPrice = pizza.price
    const originalSummary = pizza.summary
    const originalName = pizza.name
    pizza.chooseOption(`crust`, 1)
    expect(pizza.chosen.crust).not.toBe(originalChosenCrust)
    expect(pizza.price).not.toBe(originalPrice)
    expect(pizza.summary).not.toBe(originalSummary)
    expect(pizza.name).not.toBe(originalName)
  })
})

describe(`Pizza.prototype.addTopping()`, () => {
  it(`pushes a topping at desired idx in .options to .chosen`, () => {
    const pizza = new Pizza()
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`])
    expect(pizza.options.toppings[0]).toEqual(`Olive`)
    pizza.addTopping(0)
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`, `Olive`])
    expect(pizza.options.toppings[0]).not.toEqual(`Olive`)
  })
})

describe(`Pizza.prototype.removeTopping()`, () => {
  it(`splices out a chosen topping at desired idx and sorts it into options`, () => {
    const pizza = new Pizza()
    pizza.addTopping(5)
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`, `Sausage`])
    pizza.removeTopping(1)
    pizza.removeTopping(0)
    expect(pizza.chosen.toppings).toEqual([])
    expect(pizza.options.toppings).toEqual([
      `Mozzarella`,
      `Olive`,
      `Onion`,
      `Pepperoni`,
      `Pineapple`,
      `Razor Blades`,
      `Sausage`,
      `Spinach`,
      `Yak`,
    ])
  })
})

describe(`Pizza.prototype.processChange()`, () => {
  it(`updates price, summary, and name data`, () => {
    const pizza = new Pizza()
    pizza.chosen.toppings.push(`Pepperoni`)
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`, `Pepperoni`])
    expect(pizza.price).toBe(20)
    expect(pizza.summary).toBe(
      `Medium pizza with tomato sauce and mozzarella.`
    )
    expect(pizza.name).toBe(`The Classic`)
    pizza.processChange()
    expect(pizza.price).toBe(22)
    expect(pizza.summary).toBe(
      `Medium pizza with tomato sauce, mozzarella, and pepperoni.`
    )
    expect(pizza.name).toBe(`The Classic with Pepperoni`)
  })
})

describe(`Pizza.prototype.tallyPrice()`, () => {
  it(`updates price data`, () => {
    const pizza = new Pizza()
    pizza.chosen.toppings.push(`Pepperoni`)
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`, `Pepperoni`])
    expect(pizza.price).toBe(20)
    pizza.size = pizza.options.size[pizza.chosen.size]
    pizza.crust = pizza.options.crust[pizza.chosen.crust]
    pizza.sauce = pizza.options.sauce[pizza.chosen.sauce]
    pizza.tallyPrice()
    expect(pizza.price).toBe(22)
  })
})

describe(`Pizza.prototype.summarize()`, () => {
  it(`updates summary data`, () => {
    const pizza = new Pizza()
    pizza.chosen.toppings.push(`Pepperoni`)
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`, `Pepperoni`])
    expect(pizza.summary).toBe(
      `Medium pizza with tomato sauce and mozzarella.`
    )
    pizza.size = pizza.options.size[pizza.chosen.size]
    pizza.crust = pizza.options.crust[pizza.chosen.crust]
    pizza.sauce = pizza.options.sauce[pizza.chosen.sauce]
    pizza.summarize()
    expect(pizza.summary).toBe(
      `Medium pizza with tomato sauce, mozzarella, and pepperoni.`
    )
  })
})

describe(`Pizza.prototype.rename()`, () => {
  it(`determines the name of your pizza`, () => {
    const pizza = new Pizza()
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`])
    expect(pizza.name).toBe(`The Classic`)
  })
  it(`names my dad's favorite pizza 'The New Yorker with Olive'`, () => {
    const pizza = new Pizza()
    pizza.chooseOption(`size`, 1)
    pizza.chooseOption(`crust`, 1)
    pizza.chooseOption(`sauce`, 0)
    pizza.chooseOption(`toppings`, 0)
    expect(pizza.chosen.toppings).toEqual([`Mozzarella`, `Olive`])
    expect(pizza.name).toBe(`The New Yorker with Olive`)
  })
})
