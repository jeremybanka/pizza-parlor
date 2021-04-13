/* eslint func-names: 0 */
/* eslint no-restricted-syntax: 0 */

const _contains = function (...args) {
  const maybeArray = args[0]
  const elements = Array.isArray(maybeArray) ? maybeArray : args
  for(const element of elements) {
    if(!this.includes(element)) return false
  }
  return true
}

const _comprises = function (...args) {
  const maybeArray = args[0]
  const queryElements = Array.isArray(maybeArray) ? maybeArray : args
  for(const queryElement of queryElements) {
    if(!this.includes(queryElement)) return false
  }
  for(const contentElement of this) {
    if(!queryElements.includes(contentElement)) return false
  }
  return true
}

const _overlaps = function (...args) {
  const maybeArray = args[0]
  const elements = Array.isArray(maybeArray) ? maybeArray : args
  let incidences = 0
  for(const element of elements) {
    if(this.includes(element)) incidences += 1
  }
  return incidences
}

const _excludes = function (...args) {
  const maybeArray = args[0]
  const elements = Array.isArray(maybeArray) ? maybeArray : args
  let incidences = 0
  for(const element of elements) {
    if(this.includes(element)) incidences += 1
  }
  return !incidences
}

export { _contains, _comprises, _overlaps, _excludes }
