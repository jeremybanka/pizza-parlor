// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// LOGIC
import { Session } from './core'

const mySession = new Session()

console.log(mySession)
console.log(`pass phase:`, mySession.passPhase())
console.log(`new phase:`, mySession.phase.id)
console.log(`add pizza:`, mySession.addPizza())
console.log(`new order item:`, mySession.order[mySession.order.length - 1])
console.log(`change view:`, mySession.changeView(0))
console.log(`new view:`, mySession.phase.view)
console.log(`other views:`, mySession.phase.otherViews)
console.log(`change view:`, mySession.changeView(`list`))
console.log(`new view:`, mySession.phase.view)
console.log(`other views:`, mySession.phase.otherViews)
console.log(`remove pizza:`, mySession.removeFromOrder(0))
