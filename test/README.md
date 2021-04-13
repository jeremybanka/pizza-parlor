
### Describe: `new Session()`
* **Test**\
  Sets up a Session with an empty order, readymade states, and a subzero idTicker.
* **Code**
  ```
  const mySession = new Session()
  > mySession
  ```
* **Expect**
  ```
  < Session {
    order: [],
    idTicker: -1,
    state: {
      id: 'welcome',
      view: 'splash-screen',
    },
    nextStates: [
      {
        id: 'order-in-progress',
        view: 'list',
        otherViews: [], 
        // this will fill with the ids of your pizzas
        isUnfinished: true,
      },
      {
        id: 'order-under-review',
        view: 'list',
      },
      {
        id: 'order-complete',
        view: 'splash-screen',
      },
    ],
  }
  ```
### Describe: `Session.prototype.goToNextState()`
* **Test**\
  Passes into next state of session.
* **Code**
  ```
  const sampleSession = new Session()
  sampleSession.goToNextState()

  > sampleSession 
  ```
* **Expect**
  ```
  < Session {
      order: [],
      idTicker: -1,
      state: {
        id: ORDER_IN_PROGRESS,
        view: LIST,
        otherViews: [],
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
  ```
* **Test**\
  Won't pass unfinished state.
* **Code**
  ```
  const sampleSession = new Session()
  sampleSession.goToNextState()
  sampleSession.goToNextState()

  > sampleSession.state

  > sampleSession.nextStates
  ```
* **Expect**
  ```
  < {
    id: ORDER_IN_PROGRESS,
    view: LIST,
    otherViews: [],
    isUnfinished: true, // hold it right there, bud.
  }

  < [
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
  ```
### Describe: `Session.prototype.changeView()`
* **Test**\
  Does nothing if you try to change to your current view.
* **Code**
  ```
  const sampleSession = new Session()
  const originalView = sampleSession.state.view
  sampleSession.changeView(originalView)

  > sampleSession.state.view
  ```
* **Expect**
  ```
  < originalView
  ```
* **Test**\
  Throws error if you try to change to a nonexistent view.
* **Code**
  ```
  const sampleSession = new Session()
  const originalView = sampleSession.state.view
  const nonExistentView = `this-view-does-not-exist`

  > sampleSession.changeView(nonExistentView)

  > sampleSession.state.view
  ```
* **Expect**
  ```
  x Error
  < originalView
  ```
* **Test**\
  Puts originalView at otherViews[0], changes view to desired, other, extant view.
* **Code**
  ```
  const sampleSession = new Session()
  const originalView = sampleSession.state.view
  const exampleView = `example-view`
  sampleSession.state.otherViews = [exampleView]
  sampleSession.changeView(exampleView)

  > sampleSession.state.view

  > sampleSession.state.otherViews[0]
  ```
* **Expect**
  ```
  < exampleView

  < originalView
  ```
### Describe: `Session.prototype.removeView()`
* **Test**\
  Gets rid of other view from otherViews.
* **Code**
  ```
  const sampleSession = new Session()
  const exampleView = `example-view`
  sampleSession.state.otherViews = [exampleView]
  sampleSession.removeView(exampleView)

  > sampleSession.state.otherViews
  ```
* **Expect**
  ```
  < []
  ```
* **Test**\
  Errors, does nothing if you try to remove current view.
* **Code**
  ```
  const sampleSession = new Session()
  const currentView = sampleSession.state.view
  
  > sampleSession.removeView(currentView)

  > sampleSession.state.view
  ```
* **Expect**
  ```
  x Error

  < currentView
  ```
### Describe: `Session.prototype.addToOrder()`
* **Test**\
  throws error, does nothing if called in wrong state
* **Code**
  ```
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  const stateId = sampleSession.state.id
  const sampleOrder = sampleSession.order

  > stateId

  > sampleSession.addToOrder(perfectPizza)

  > sampleOrder
  ```
* **Expect**
  ```
  < WELCOME

  x Error

  < []
  ```
* **Test**\
  throws error, does nothing if it sees a non-Pizza
* **Code**
  ```
  const sampleSession = new Session()
  sampleSession.goToNextState()
  const nonPizza = `im not even a object lol`
  const stateId = sampleSession.state.id
  const sampleOrder = sampleSession.order

  > stateId

  > sampleSession.addToOrder(nonPizza)

  > sampleOrder
  ```
* **Expect**
  ```
  < ORDER_IN_PROGRESS

  x Error

  < []
  ```
* **Test**\
  adds a pizza to your order when in correct state
* **Code**
  ```
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  sampleSession.goToNextState()
  const stateId = sampleSession.state.id
  sampleSession.addToOrder(perfectPizza)
  const sampleOrder = sampleSession.order

  > stateId

  > sampleOrder
  ```
* **Expect**
  ```
  < ORDER_IN_PROGRESS

  < [perfectPizza]
  ```
### Describe: `Session.prototype.removeFromOrder()`
* **Test**\
  Description
* **Code**
  ```
  const sampleSession = new Session()
  sampleSession.goToNextState()
  sampleSession.addPizza()
  sampleSession.removeFromOrder(0)
  const sampleOrder = sampleSession.order

  > sampleOrder
  ```
* **Expect**
  ```
  < []
  ```
### Describe: `Session.prototype.addPizza()`
* **Test**\
  Description
* **Code**
  ```
  const sampleSession = new Session()
  const perfectPizza = new Pizza()
  perfectPizza.id = 0 // simulate adding our new pizza to the order
  sampleSession.goToNextState()
  const stateId = sampleSession.state.id
  sampleSession.addPizza()
  const sampleOrder = sampleSession.order

  > stateId
  
  > sampleOrder
  ```
* **Expect**
  ```
  < ORDER_IN_PROGRESS

  < [perfectPizza]
  ```
### Describe: `new Pizza()`
* **Test**\
  Creates an 'empty' medium Pizza with a placeholder id and default toppings.
* **Code**
  ```
  const myPizza = new Pizza()
  > myPizza
  ```
* **Expect**
  ```
  < Pizza {
    id: -1, 
    // id -1 is a signal that this pizza 
    // has not been added to an order 
    name: "The Classic",
    summary: 
      "Regular crust, 
       tomato sauce, 
       and mozzerella.",
    price: 20,
    chosen: {
      size: 1,
      crustIdx: 1,
      sauceIdx: 0,
      toppings: ['Mozzerella'],
    },
    options: {
      sizes: ['S', 'M', 'L'],
      crusts: ['regular', 'thin', 'thick'],
      sauces: 0,
      toppings: [],
    },
  }
  ```
### Describe: `Pizza.prototype.chooseOption()`
* **Test**\
  changes an aspect of a pizza, causing cascading changes
* **Code**
  ```
  const pizza = new Pizza()
  const originalChosenCrust = pizza.chosen.crust
  const originalPrice = pizza.price
  const originalSummary = pizza.summary
  const originalName = pizza.name
  pizza.chooseOption(`crust`, 1)

  > pizza.chosen.crust === originalChosenCrust

  > pizza.price === originalPrice

  > pizza.summary === originalSummary

  > pizza.name === originalName
  ```
* **Expect**
  ```
  < false

  < false

  < false

  < false
  ```
### Describe: `Pizza.prototype.addTopping()`
* **Test**\
  Description
* **Code**
  ```
  const pizza = new Pizza()

  > pizza.chosen.toppings

  > pizza.options.toppings[0]

  pizza.addTopping(0)

  > pizza.chosen.toppings

  > pizza.options.toppings[0] === `Olive`

  ```
* **Expect**
  ```
  < [`Mozzarella`]

  < `Olive`

  < [`Mozzarella`, `Olive`]

  < false
  ```
### Describe: `Pizza.prototype.removeTopping()`
* **Test**\
  splices out a chosen topping at desired idx and sorts it into options
* **Code**
  ```
  const pizza = new Pizza()
    pizza.addTopping(5)

    > pizza.chosen.toppings

    pizza.removeTopping(1)
    pizza.removeTopping(0)

    > pizza.chosen.toppings 

    > pizza.options.toppings
  ```
* **Expect**
  ```
  < [`Mozzarella`, `Sausage`]

  < []

  < [
      `Mozzarella`,
      `Olive`,
      `Onion`,
      `Pepperoni`,
      `Pineapple`,
      `Razor Blades`,
      `Sausage`,
      `Spinach`,
      `Yak`,
    ]
  ```
### Describe: `Pizza.prototype.processChange()`
* **Test**\
  updates price, summary, and name data
* **Code**
  ```
  const pizza = new Pizza()
  pizza.chosen.toppings.push(`Pepperoni`)

  > pizza.chosen.toppings

  > pizza.price

  > pizza.summary

  > pizza.name

  pizza.processChange()

  > pizza.price

  > pizza.summary

  > pizza.name
  ```
* **Expect**
  ```
  < [`Mozzarella`, `Pepperoni`]

  < 20

  < `Medium pizza with tomato sauce and mozzarella.`

  < `The Classic`

  < 22

  < `Medium pizza with tomato sauce, mozzarella, and pepperoni.`

  < `The Classic with Pepperoni`
  ```
### Describe: `Pizza.prototype.tallyPrice()`
* **Test**\
  updates price data
* **Code**
  ```
  const pizza = new Pizza()
  pizza.chosen.toppings.push(`Pepperoni`)

  > pizza.chosen.toppings

  > pizza.price

  pizza.size = pizza.options.size[pizza.chosen.size]
  pizza.crust = pizza.options.crust[pizza.chosen.crust]
  pizza.sauce = pizza.options.sauce[pizza.chosen.sauce]
  pizza.tallyPrice()

  > pizza.price
  ```
* **Expect**
  ```
  < [`Mozzarella`, `Pepperoni`]

  < 20

  < 22
  ```
### Describe: `Pizza.prototype.summarize()`
* **Test**\
  updates summary data
* **Code**
  ```
  const pizza = new Pizza()
  pizza.chosen.toppings.push(`Pepperoni`)

  > pizza.chosen.toppings

  > pizza.summary

  pizza.size = pizza.options.size[pizza.chosen.size]
  pizza.crust = pizza.options.crust[pizza.chosen.crust]
  pizza.sauce = pizza.options.sauce[pizza.chosen.sauce]
  pizza.summarize()

  > pizza.summary
    
  ```
* **Expect**
  ```
  < [`Mozzarella`, `Pepperoni`]

  < `Medium pizza with tomato sauce and mozzarella.`

  < `Medium pizza with tomato sauce, mozzarella, and pepperoni.`
  ```
### Describe: `Pizza.prototype.rename()`
* **Test**\
  determines the name of your pizza
* **Code**
  ```
  const pizza = new Pizza()

  > pizza.chosen.toppings

  > pizza.name
  ```
* **Expect**
  ```
  < [`Mozzarella`]

  < `The Classic`
  ```

### Describe: `new Extension()`
* **Test**\
  creates an Extension targeting the Array Prototype, for example
* **Code**
  ```
  const extension = new Extension(Array)

  > extension.constructor.name
  
  > extension.scope
  ```
* **Expect**
  ```
  < `Extension`

  < Array
  ```
### Describe: `extend(Prototype)`
* **Test**\
  creates and returns an Extension targeting the Array Prototype, for example
* **Code**
  ```
  const output = extend(Array)

  > output.constructor.name
  
  > output.scope
  ```
* **Expect**
  ```
  < `Extension`

  < Array
  ```
### Describe: `Extension.prototype.with(...methods)`
* **Test**\
  adds methods to the targeted Prototype
* **Code**
  ```
  extend(Array).with(_contains, _comprises, _overlaps)

  > typeof Array.prototype._contains
  
  > typeof Array.prototype._comprises

  > typeof Array.prototype._overlaps
  ```
* **Expect**
  ```
  < `function`

  < `function`

  < `function`
  ```
### Describe: `Array.prototype._contains()`
* **Test**\
  returns true if the array includes each of the passed args, or each element in a passed array
* **Code**
  ```
  const numbers = [0, 1, 2, 3, 4, 5]

  > numbers._contains(1, 3)

  > numbers._contains(6, 3)

  > numbers._contains([1, 3])
  ```
* **Expect**
  ```
  < true
  
  < false

  < true
  ```
### Describe: `Array.prototype._comprises()`
* **Test**\
  returns true if each element in the array finds a match among the passed args, and vice versa
* **Code**
  ```
  const importantThings = [
    `sleep`, `exercise`, `nutrition`, `love`
  ]

  > importantThings._comprises(
      `sleep`, `exercise`, `nutrition`, `love`
    )

  > importantThings._comprises(
      `sleep`, `sleep`, `exercise`, `nutrition`, `love`
    )

  > importantThings._comprises(
      `exercise`, `nutrition`, `love`
    )

  > importantThings._comprises(
      `hardcore gaming`, `exercise`, `nutrition`, `love`
    )
  ```
* **Expect**
  ```
  < true

  < true

  < false

  < false
  ```

### Describe: `Array.prototype._overlaps()`
* **Test**\
  returns number of matched elements 'overlaps' between the array and passed args
* **Code**
  ```
  const importantThings = [
    `sleep`, `exercise`, `nutrition`, `love`
  ]

  > importantThings._overlaps(
      `sleep`,
    )

  > importantThings._overlaps(
      `sleep`, `sleep`, `exercise`, `nutrition`, `love`
    )

  > importantThings._overlaps(
      `exercise`, `nutrition`, `love`
    )

  > importantThings._overlaps(
      `hardcore gaming`, `gamer fuel`,
    )
  ```
* **Expect**
  ```
  < 1

  < 5

  < 3

  < 0
  ```

### Describe: `Array.prototype._excludes()`
* **Test**\
  returns true if each of the specified items are not in the array
* **Code**
  ```
  const importantThings = [
    `sleep`, `exercise`, `nutrition`, `love`
  ]

  > importantThings._excludes(
      `torment`, `anguish`,
    )

  > importantThings._excludes(
      `torment`, `anguish`, `exercise`,
    )
  ```
* **Expect**
  ```
  < true

  < false
  ```
