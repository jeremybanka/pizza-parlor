/* eslint import/no-cycle: 0 */

import $ from 'jquery'
import $render from '../app'

const OPTIONS_GROUP_IDS = [`size`, `crust`, `sauce`]

export function $makePizzaEditor(session, item) {
  const $main = $(`<main/>`)
    .attr(`id`, `order-list`)

  const $overview = $(`<section/>`)
    .attr(`id`, `overview`)
  const $heading = $(`<h2/>`)
    .text(`Customize Your Pizza`)
    .addClass(`center`)
  const $imgWrapper = $(`<div/>`)
    .addClass(`img-wrap`)
  const $subheading = $(`<h3/>`)
    .text(item.name)
    .addClass(`center`)
  const $price = $(`<p/>`)
    .text(`$${session.getTotalPrice()}`)
  const $description = $(`<p/>`)
    .text(item.summary)
  $overview.append([$heading, $imgWrapper, $subheading, $description, $price])

  const $controls = $(`<section/>`)
    .attr(`id`, `controls`)
  const $radioGroups = OPTIONS_GROUP_IDS.map(radioGroupId => {
    const options = item.options[radioGroupId]
    const chosenIdx = item.chosen[radioGroupId]
    const role = `main`
    return $makeRadioGroup({ radioGroupId, options, chosenIdx, role })
  })
  const $toppingsControls = $makeToppingsControls(session, item)
  $controls.append(...$radioGroups, $toppingsControls)

  $main.append([$overview, $controls])

  const $cancelButton = $(`<button/>`)
    .addClass(`prev`)
    .text(`Cancel`)
    .attr(`id`, `cancel-changes`)
  const $applyButton = $(`<button/>`)
    .addClass(`next`)
    .text(`Apply`)
    .attr(`id`, `apply-changes`)
  const $footer = $(`<footer/>`)
    .append($cancelButton, $applyButton)

  return [$main, $footer]
}

export function $listenPizzaEditor(session, item) {
  $(`#add-pizza`).on(`click`, () => {
    session.addPizza()
    $render(session)
  })
  $(`#done`).on(`click`, () => {
    session.goToNextState()
    $render(session)
  })
  $(`[type='radio'].main`).on(`click`, e => {
    console.log(e.target)
    const key = e.target.name
    const idx = parseInt(e.target.value, 10)
    item.chooseOption(key, idx)
    $render(session)
  })
  $(`button#apply-changes`).on(`click`, () => {
    session.changeView(`list`)
    $render(session)
  })
  $(`button#cancel-changes`).on(`click`, () => {
    session.changeView(`list`)
    $render(session)
  })
  $(`button.delete-topping`).on(`click`, e => {
    const targetItem = parseInt(e.target.value, 10)
    item.removeTopping(targetItem)
    $render(session)
  })
  $(`button#open-topping-options`).on(`click`, () => {
    session.state.toppingOptionsIsOpen = true
    $render(session)
  })
  $(`button#cancel-new-topping`).on(`click`, () => {
    session.state.toppingOptionsIsOpen = false
    $render(session)
  })
  $(`[type='radio'].select-new`).on(`click`, e => {
    const idx = parseInt(e.target.value, 10)
    item.cachedToppingChoice = idx
    $render(session)
  })
  $(`button#confirm-new-topping`).on(`click`, () => {
    session.state.toppingOptionsIsOpen = false
    item.chooseOption(`toppings`, item.cachedToppingChoice)
    delete item.cachedToppingChoice
    $render(session)
  })
}

function $makeToppingsControls(session, item) {
  const $controlGroup = $makeControlGroup(`Toppings`)
  const $chosenToppings = item.chosen.toppings.map((topping, idx) => {
    const $chosenTopping = $(`<span/>`)
      .addClass(`control-cluster`)
    const $label = $(`<span/>`)
      .text(topping)
    const $deleteToppingButton = $(`<button/>`)
      .text(`x`)
      .attr(`value`, idx)
      .addClass(`delete-topping`)
    return $chosenTopping.append($label, $deleteToppingButton)
  })
  const $unchosenToppings = session.state.toppingOptionsIsOpen
    ? (() => {
      const $optionsStrip = $makeStrip(`Toppings`)
      const $cancelButton = $(`<button/>`)
        .text(`x`)
        .attr(`id`, `cancel-new-topping`)
      const $horizontalScroller = $(`<div/>`)
        .addClass(`horizontal-scroller`)
      const $radioButtons = $makeRadioButtons({
        radioGroupId: `select-new-topping`,
        options: item.options.toppings,
        chosenIdx: item.cachedToppingChoice,
        role: `select-new`,
      })
      const $confirmButton = $(`<button/>`)
        .text(`c`)
        .attr(`id`, `confirm-new-topping`)
      $horizontalScroller.append($radioButtons)
      $optionsStrip.append($cancelButton, $horizontalScroller, $confirmButton)
      return $optionsStrip
    })()
    : (() => {
      const $addToppingButton = $(`<button/>`)
        .text(`Add Topping`)
        .attr(`id`, `open-topping-options`)
      return $addToppingButton
    })()
  return $controlGroup.append($chosenToppings, $unchosenToppings)
}

function $makeRadioGroup({ radioGroupId, options, chosenIdx, role }) {
  const groupName = radioGroupId.replace(/^\w/, c => c.toUpperCase())
  const $controlGroup = $makeControlGroup(groupName)
  const $radioButtons = $makeRadioButtons(
    { options, chosenIdx, radioGroupId, role }
  )
  return $controlGroup.append($radioButtons)
}

function $makeStrip() {
  const $strip = $(`<div/>`)
    .addClass(`strip`)
  return $strip
}

function $makeControlGroup(groupName) {
  const $controlGroup = $(`<div/>`)
    .addClass(`control-group`)
  const $heading = $(`<h5/>`)
    .text(groupName)
  $controlGroup.append($heading)
  return $controlGroup
}

function $makeRadioButtons({ radioGroupId, options, chosenIdx, role }) {
  const $radioButtons = options.map((option, idx) => {
    const checked = idx === chosenIdx
    return $makeRadioButton({ option, idx, radioGroupId, checked, role })
  })
  return $radioButtons
}

function $makeRadioButton({ option, idx, radioGroupId, checked, role }) {
  const $radioButton = $(`<label/>`)
  const $border = $(`<div class='border'/>`)
  const $textSpan = $(`<span/>`).text(option)
  const $radioElement = $makeRadioElement({ radioGroupId, idx, checked, role })
  $radioButton.append($radioElement, $border, $textSpan)
  return $radioButton
}

function $makeRadioElement({ radioGroupId, idx, checked, role }) {
  console.log(radioGroupId, idx, checked)
  const $radioElement = $(`<input type='radio'/>`)
    .attr(`name`, radioGroupId)
    .attr(`value`, idx)
    .attr(`checked`, checked)
    .addClass(role)
  return $radioElement
}
