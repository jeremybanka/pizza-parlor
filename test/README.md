
### Describe: `Session()`

* **Test**\
  Set up a Session with an empty order, readymade states, and a subzero idTicker.
* **Code**
  ```
  const mySession = new Session()
  mySession
  ```
* **Expect**
  ```
  Session {
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

### Describe: `Pizza()`

* **Test**\
  Create an 'empty' medium Pizza with a placeholder id and default toppings.
* **Code**
  ```
  const myPizza = new Pizza()
  myPizza
  ```
* **Expect**
  ```
  Pizza {
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

  ### Describe: `Pizza.prototype.modify()`

  ### Describe: `Pizza.prototype.tallyPrice()`
  