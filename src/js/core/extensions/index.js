/* eslint func-names: 0 */
/* eslint no-extend-native: 0 */
/* eslint no-restricted-syntax: 0 */

const extend = Prototype => new Extension(Prototype)

function Extension(Prototype) {
  this.scope = Prototype
}

Extension.prototype.with = function (...methods) {
  for (const method of methods) {
    this.scope.prototype[method.name] = method
  }
}

export default extend
