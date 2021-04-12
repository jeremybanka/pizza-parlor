import $ from 'jquery'
import { $makeWelcome, $listenWelcome } from './$welcome'
import { $makeOrderList, $listenOrderList } from './$orderList'
import { $makePizzaCustomizer, $listenPizzaCustomizer } from './$pizzaCustomizer'

import { $makeFarewell, $listenFarewell } from './$farewell'

export {
  $wipe,
  $printWelcome,
  $printOrderList,
  $printPizzaCustomizer,
  $printReviewer,
  $printFarewell,
}

function $wipe() { $(`body`).empty() }
function $print($content) { $(`body`).append($content) }

function $printWelcome(session) {
  const $welcome = $makeWelcome()
  $print($welcome)
  $listenWelcome(session)
}
function $printOrderList(session) {
  const $orderList = $makeOrderList(session)
  $print($orderList)
  $listenOrderList(session)
}
function $printPizzaCustomizer(session) {
  const item = session.order[session.state.view]
  const $pizzaCustomizer = $makePizzaCustomizer(session, item)
  $print($pizzaCustomizer)
  $listenPizzaCustomizer(session, item)
}
function $printReviewer(session) {
  const $orderList = $makeOrderList(session)
  $print($orderList)
  $listenOrderList(session)
}
function $printFarewell(session) {
  const $farewell = $makeFarewell(session)
  $print($farewell)
  $listenFarewell(session)
}
