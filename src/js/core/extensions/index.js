/* eslint func-names: 0 */
/* eslint no-extend-native: 0 */
/* eslint no-restricted-syntax: 0 */

const extend = GlobalObject => new Extension(GlobalObject)

function Extension(GlobalObject) {
  this.scope = GlobalObject
}

Extension.prototype.with = function (...methods) {
  for(const method of methods) {
    this.scope.prototype[method.name] = method
  }
}

export default extend
