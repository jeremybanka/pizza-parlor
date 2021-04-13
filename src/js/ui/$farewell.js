/* eslint import/no-cycle: 0 */

import $ from 'jquery'
import $render from '../app'

export function $makeFarewell() {
  const $bg = $(`<div/>`)
    .attr(`id`, `bg`)

  const $main = $(`<main/>`)
    .attr(`id`, `welcome`)
  const $success = $(`<h1/>`)
    .text(`Success!`)
  $main.append([$success])

  const $footer = $(`<footer/>`)
  const $button = $(`<button/>`)
    .text(`Start Over`)
    .addClass(`reset`)
    .attr(`id`, `start-over`)
  $footer.append($button)

  return [$bg, $main, $footer]
}

export function $listenFarewell() {
  $(`#start-over`).on(`click`, () => {
    $render()
  })
}
