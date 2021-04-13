import $ from 'jquery'
import { $makeWelcome, $listenWelcome } from './$welcome'
import { $makeOrderList, $listenOrderList } from './$orderList'
import { $makePizzaEditor, $listenPizzaEditor } from './$pizzaEditor'
import { $makeReviewer, $listenReviewer } from './$reviewer'
import { $makeFarewell, $listenFarewell } from './$farewell'

export {
  $wipe,
  $printWelcome,
  $printOrderList,
  $printPizzaEditor,
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
function $printPizzaEditor(session) {
  const item = session.order[session.state.view]
  const $pizzaEditor = $makePizzaEditor(session, item)
  $print($pizzaEditor)
  $listenPizzaEditor(session, item)
}
function $printReviewer(session) {
  const $orderList = $makeReviewer(session)
  $print($orderList)
  $listenReviewer(session)
}
function $printFarewell(session) {
  const $farewell = $makeFarewell(session)
  $print($farewell)
  $listenFarewell(session)
}
