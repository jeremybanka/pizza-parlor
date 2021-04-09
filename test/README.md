
### Describe: `Session()`

* **Test**\
  Set up a Session with an empty order, no coupon, and a subzero idTicker.
* **Code**
  ```
  const mySession = new Session()
  mySession
  ```
* **Expect**
  ```
  Session {
    order: [],
    coupon: null,
    idTicker: -1,
  }
  ```

### Describe: `Pizza()`

* **Test**\
  Create an 'empty' medium Pizza with a placeholder id and no toppings.
* **Code**
  ```
  const myPizza = new Pizza()
  myPizza
  ```
* **Expect**
  ```
  Pizza {
    toppings: [],
    size: 'M',
    id: -1, // seeing -1 is a signal that this pizza exists outside of an order 
  }
  ```