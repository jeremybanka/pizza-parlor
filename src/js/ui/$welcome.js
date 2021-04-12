/* eslint import/no-cycle: 0 */

import $ from 'jquery'
import $render from '../app'

export function $makeWelcome() {
  const $bg = $(`<div/>`)
    .attr(`id`, `bg`)

  const $main = $(`<main/>`)
    .attr(`id`, `welcome`)
  const $heading = $(`<h1/>`)
    .text(`Welcome to Grouchy Pizza`)
  const $subheading = $(`<p/>`)
    .text(`“Why don’t you order some god damn food and get out of here?”`)
  $main.append([$heading, $subheading])

  const $footer = $(`<footer/>`)
  const $button = $(`<button/>`)
    .text(`I'm Hungry! Help!`)
    .addClass(`big next brand`)
    .attr(`id`, `next`)
  $footer.append($button)

  return [$bg, $main, $footer]
}

export function $listenWelcome(session) {
  $(`#next`).on(`click`, () => {
    session.goToNextState()
    $render(session)
  })
}
