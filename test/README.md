
### Describe: `Session()`

* **Test**\
  Set up a Session with an empty order, readymade phases, and a subzero idTicker.
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
    phase: {
      id: 'welcome',
      view: 'splash-screen',
      phase: false,
    },
    nextPhases: [
      {
        id: 'design-order',
        view: 'list',
        otherViews: [], 
        // this will fill with the ids of your pizzas
        arrested: true,
      },
      {
        id: 'review-order',
        view: 'list',
        arrested: false,
      },
      {
        id: 'job-done',
        view: 'splash-screen',
        arrested: false,
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
  