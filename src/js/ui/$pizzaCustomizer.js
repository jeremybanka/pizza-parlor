/* eslint import/no-cycle: 0 */

import $, { parseHTML } from 'jquery'
import $render from '../app'

export function $makePizzaCustomizer(session, item) {
  const radioGroupKeys = [`size`, `crust`, `sauce`]

  const $main = $(`<main/>`)
    .attr(`id`, `order-list`)

  const $overview = $(`<section/>`)
    .attr(`id`, `overview`)
  const $heading = $(`<h2/>`)
    .text(`Customize Your Pizza`)
    .addClass(`center`)
  const $imgWrapper = $(`<div/>`)
    .addClass(`img-wrap`)
  const $subheading = $(`<h2/>`)
    .text(item.name)
    .addClass(`center`)
  const $price = $(`<p/>`)
    .text(`$${session.getTotalPrice()}`)
  const $description = $(`<p/>`)
    .text(item.summary)
  $overview.append([$heading, $imgWrapper, $subheading, $description, $price])

  const $controls = $(`<section/>`)
    .attr(`id`, `controls`)
  const $radioGroups = radioGroupKeys.map(key => {
    const options = item.options[key]
    const chosenIdx = item.chosen[key]
    return $makeRadioGroup({ key, options, chosenIdx })
  })
  $controls.append(...$radioGroups)

  $main.append([$overview, $controls])

  const $cancelButton = $(`<button/>`)
    .addClass(`prev`)
    .text(`Cancel`)
    .attr(`id`, `cancel`)
  const $applyButton = $(`<button/>`)
    .addClass(`next`)
    .text(`Apply`)
    .attr(`id`, `apply`)
  const $footer = $(`<footer/>`)
    .append($cancelButton, $applyButton)

  return [$main, $footer]
}

export function $listenPizzaCustomizer(session, item) {
  $(`#add-pizza`).on(`click`, () => {
    session.addPizza()
    $render(session)
  })
  $(`#done`).on(`click`, () => {
    session.goToNextState()
    $render(session)
  })
  $(`[type='radio']`).on(`click`, e => {
    console.log(e.target)
    const key = e.target.name
    const idx = parseInt(e.target.value, 10)
    item.chooseOption(key, idx)
    $render(session)
  })
  $(`button.customize`).on(`click`, e => {
    const newViewId = parseInt(e.target.id, 10)
    session.changeView(newViewId)
    $render(session)
  })
}

function $makeRadioGroup({ key, options, chosenIdx }) {
  return options.map((option, idx) => {
    const checked = idx === chosenIdx
    return $makeRadioButton({ option, idx, key, checked })
  })
}

function $makeRadioButton({ option, idx, key, checked }) {
  const $radioButton = $(`<label/>`)
  const $border = $(`<div class='border'/>`)
  const $textSpan = $(`<span/>`).text(option)
  const $radioElement = $makeRadioElement({ key, idx, checked })
  $radioButton.append($radioElement, $border, $textSpan)
  return $radioButton
}
function $makeRadioElement({ key, idx, checked }) {
  console.log(key, idx, checked)
  const $radioElement = $(`<input type='radio'/>`)
    .attr(`name`, key)
    .attr(`value`, idx)
    .attr(`checked`, checked)
  return $radioElement
}
