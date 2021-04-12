// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// UI
import $ from 'jquery'
// CORE
import { Session } from './core'
import extend from './core/extensions'
import {
  _contains,
  _matches,
  _overlaps,
  _excludes,
} from './core/extensions/array'

extend(Array).with(_contains, _matches, _overlaps, _excludes)
const mySession = new Session()

// console.log(mySession)
// console.log(`pass state:`, mySession.goToNextState())
// console.log(`new state:`, mySession.state.id)
// console.log(`add pizza:`, mySession.addPizza())
// console.log(`new order item:`, mySession.order[mySession.order.length - 1])
// console.log(`change view:`, mySession.changeView(0))
// console.log(`new view:`, mySession.state.view)
// console.log(`other views:`, mySession.state.otherViews)
// console.log(`change view:`, mySession.changeView(`list`))
// console.log(`new view:`, mySession.state.view)
// console.log(`other views:`, mySession.state.otherViews)
// console.log(mySession.order[0].processChange())
// mySession.order[0].removeTopping(`Mozzarella`)
// mySession.order[0].chooseOption(`crust`, 3)
// mySession.order[0].chooseOption(`sauce`, 3)
// mySession.order[0].chooseOption(`toppings`, 4)
