/* eslint func-names: 0 */

import Session from './Session'
import Pizza from './Pizza'

Session.prototype.addPizza = function () {
  const pizza = new Pizza()
  return this.addToOrder(pizza)
}

export { Session, Pizza }
