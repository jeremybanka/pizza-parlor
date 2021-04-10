// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// LOGIC
import { Session } from './core'

const mySession = new Session()

console.log(mySession)
console.log(`pass state:`, mySession.goToNextState())
console.log(`new state:`, mySession.state.id)
console.log(`add pizza:`, mySession.addPizza())
console.log(`new order item:`, mySession.order[mySession.order.length - 1])
console.log(`change view:`, mySession.changeView(0))
console.log(`new view:`, mySession.state.view)
console.log(`other views:`, mySession.state.otherViews)
console.log(`change view:`, mySession.changeView(LIST))
console.log(`new view:`, mySession.state.view)
console.log(`other views:`, mySession.state.otherViews)
console.log(mySession.order[0].processChange())
console.log(mySession.order[0].removeTopping(`Mozzarella`))

// console.log(`remove pizza:`, mySession.removeFromOrder(0))
