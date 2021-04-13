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

export function $listenOrderList(session) {
  $(`#add-pizza`).on(`click`, () => {
    session.addPizza()
    $render(session)
  })
  $(`#next`).on(`click`, () => {
    session.goToNextState()
    $render(session)
  })
  $(`button.customize`).on(`click`, e => {
    const newViewId = parseInt(e.target.id, 10)
    session.changeView(newViewId)
    $render(session)
  })
}

function $makeOrderItem(item) {
  console.log(item.name)
  const nameOfItem = item.name
  const $orderItem = $(`<section/>`)
  const $header = $(`<h4/>`)
    .text(nameOfItem)
  const $description = $(`<p/>`)
    .text(item.summary)
  const $price = $(`<p/>`)
    .text(`$${item.price}`)
  const $customizeButton = $(`<button/>`)
    .text(`Customize`)
    .addClass(`customize`)
    .attr(`id`, item.id)
  $orderItem.append([$header, $price, $description, $customizeButton])
  return $orderItem
}