/* eslint import/no-cycle: 0 */

import $ from 'jquery'
import $render from '../app'

export function $makeOrderList(session) {
  const $main = $(`<main/>`)
    .attr(`id`, `order-list`)

  const $overview = $(`<section/>`)
    .attr(`id`, `overview`)
  const $heading = $(`<h2/>`)
    .text(`Your Order`)
  const $price = $(`<p/>`)
    .text(`$${session.getTotalPrice()}`)
  $overview.append([$heading, $price])

  const $content = $(`<section/>`)
    .attr(`id`, `content`)
  const $orderItems = session.order.map(item => $makeOrderItem(item))
  const $newItemButton = $(`<button/>`)
    .addClass(`big next`)
    .text(`Add Pizza`)
    .attr(`id`, `add-pizza`)
  $content.append([...$orderItems, $newItemButton])

  $main.append([$overview, $content])

  const $footer = $(`<footer/>`)
  const $readyButton = $(`<button/>`)
    .addClass(`big next`)
    .text(`I'm Ready`)
    .attr(`id`, `next`)
    .attr(`disabled`, session.state.isUnfinished)
  $footer.append($readyButton)

  return [$main, $footer]
}

function $makeOrderItem(item) {
  const nameOfItem = item.name
  const $orderItem = $(`<section/>`)
  const $header = $(`<h4/>`)
    .text(nameOfItem)
  const $description = $(`<p/>`)
    .text(item.summary)
  const $price = $(`<p/>`)
    .text(`$${item.price}`)
  const $editButton = $(`<button/>`)
    .text(`Edit`)
    .addClass(`edit`)
    .attr(`value`, item.id)
  const $deleteButton = $(`<button/>`)
    .text(`Delete`)
    .addClass(`delete`)
    .attr(`value`, item.id)
  $orderItem.append([$header, $price, $description, $editButton, $deleteButton])
  return $orderItem
}

export function $listenOrderList(session) {
  $(`#next`).on(`click`, () => {
    session.goToNextState()
    $render(session)
  })
  $(`#add-pizza`).on(`click`, () => {
    session.addPizza()
    $render(session)
  })
  $(`button.edit`).on(`click`, e => {
    const newViewId = parseInt(e.target.value, 10)
    session.changeView(newViewId)
    $render(session)
  })
  $(`button.delete`).on(`click`, e => {
    const itemId = parseInt(e.target.value, 10)
    session.removeFromOrder(itemId)
    $render(session)
  })
}
