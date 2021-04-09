// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// LOGIC
import { Pizza, Session } from './core'

const mySession = new Session()
const myPizza = new Pizza()

console.log(mySession)
console.log(`pass phase:`, mySession.passPhase())
console.log(`new phase`, mySession.phase.id)
console.log(`add to order:`, mySession.addToOrder(myPizza))
console.log(`new order item`, mySession.order[mySession.order.length - 1])
console.log(`change view:`, mySession.changeView(0))
console.log(`new view`, mySession.phase.view)
