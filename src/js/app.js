// STYLE
import '../styles/core.scss'
import '../styles/font-face.scss'
// UI
import $ from 'jquery'
import {
  $wipe,
  $printWelcome,
  $printOrderList,
  $printPizzaCustomizer,
  $printReviewer,
  $printFarewell,
} from './ui/$macros'
// CORE
import { Session } from './core'
import { WELCOME,
  ORDER_IN_PROGRESS,
  ORDER_UNDER_REVIEW,
  ORDER_COMPLETE } from './core/Session'
import extend from './core/extensions'
import {
  _contains,
  _matches,
  _overlaps,
  _excludes,
} from './core/extensions/array'

extend(Array).with(_contains, _matches, _overlaps, _excludes)

const session = new Session()

$(() => {
  session.goToNextState()
  console.log(session)
  session.goToNextState()
  console.log(session.state.id)
  session.addPizza()
  console.log(session.order[session.order.length - 1])
  session.changeView(0)
  $render(session)

  // session.state.view
  // session.state.otherViews
  // session.changeView(`list`)
  // session.state.view
  // session.state.otherViews
  // session.order[0].processChange()
  // session.order[0].removeTopping(`Mozzarella`)
  // session.order[0].chooseOption(`crust`, 3)
  // session.order[0].chooseOption(`sauce`, 3)
  // session.order[0].chooseOption(`toppings`, 4)
})

export default function $render(session) {
  $wipe()
  switch(session.state.id) {
    case WELCOME:
      $printWelcome(session)
      break
    case ORDER_IN_PROGRESS:
      switch(typeof session.state.view) {
        case `string`:
          $printOrderList(session)
          break
        case `number`:
          $printPizzaCustomizer(session)
          break
        default:
      }
      break
    case ORDER_UNDER_REVIEW:
      $printReviewer(session)
      break
    case ORDER_COMPLETE:
      $printFarewell(session)
      break
    default:
      break
  }
}
