/* eslint import/no-cycle: 0 */

import $ from 'jquery'
import $render from '../app'

export function $makeReviewer(session) {
  const $main = $(`<main/>`)
    .attr(`id`, `order-list`)

  const $overview = $(`<section/>`)
    .attr(`id`, `overview`)
  const $heading = $(`<h2/>`)
    .text(`Review Order`)
  const $price = $(`<p/>`)
    .text(`$${session.getTotalPrice()}`)
  $overview.append([$heading, $price])

  const $content = $(`<section/>`)
    .attr(`id`, `content`)
  const $orderItems = session.order.map(item => $makeOrderItem(item))
  $content.append(...$orderItems)

  $main.append([$overview, $content])

  const $footer = $(`<footer/>`)
  const $cancelButton = $(`<button/>`)
    .addClass(`big next`)
    .text(`Cancel`)
    .attr(`id`, `prev`)
  const $payButton = $(`<button/>`)
    .addClass(`big next`)
    .text(`Pay`)
    .attr(`id`, `next`)
  $footer.append($cancelButton, $payButton)

  return [$main, $footer]
}

export function $listenReviewer(session) {
  $(`#prev`).on(`click`, () => {
    session.goToPrevState()
    $render(session)
  })
  $(`#next`).on(`click`, () => {
    session.goToNextState()
    $render(session)
  })
}

function $makeOrderItem(item) {
  _comprises(item.name)
  const nameOfItem = item.name
  const $orderItem = $(`<section/>`)
  const $header = $(`<h4/>`)
    .text(nameOfItem)
  const $description = $(`<p/>`)
    .text(item.summary)
  const $price = $(`<p/>`)
    .text(`$${item.price}`)
  $orderItem.append([$header, $price, $description])
  return $orderItem
}
