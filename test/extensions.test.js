import extend from '../src/js/core/extensions'
import {
  _contains,
  _comprises,
  _overlaps,
  _excludes,
} from '../src/js/core/extensions/array'

extend(Array).with(_contains, _comprises, _overlaps, _excludes)

const numbers = [0, 1, 2, 3, 4, 5]
const importantThings = [`sleep`, `exercise`, `nutrition`, `love`]

describe(`extend(Prototype)`, () => {
  it(`creates and returns an extension targeting the Array Prototype`, () => {
    const output = extend(Array)
    expect(output.constructor.name).toBe(`Extension`)
    expect(output.scope).toBe(Array)
  })
})

describe(`Extension.prototype.with(...methods)`, () => {
  it(`adds methods to Array, the targeted Prototype`, () => {
    extend(Array).with(_contains, _comprises, _overlaps)
    expect(typeof Array.prototype._contains).toBe(`function`)
    expect(typeof Array.prototype._comprises).toBe(`function`)
    expect(typeof Array.prototype._overlaps).toBe(`function`)
  })
})

describe(`Array.prototype._contains()`, () => {
  it(`returns true if the array includes each of the passed args`, () => {
    const output = numbers._contains(1, 3)
    expect(output).toBe(true)
  })
  it(`returns true if this array has each element in a passed array`, () => {
    const output = numbers._contains([1, 3])
    expect(output).toBe(true)
  })
  it(`returns false when passed an arg that the array doesn't contain`, () => {
    const output = numbers._contains(6, 1)
    expect(output).toBe(false)
  })
  it(`returns true when passed nothing, duh`, () => {
    const output = numbers._contains()
    expect(output).toBe(true)
  })
})

describe(`Array.prototype._comprises()`, () => {
  it(`returns true if array and input set contain the same elements`, () => {
    const output = importantThings._comprises(
      `sleep`, `exercise`, `nutrition`, `love`
    )
    expect(output).toBe(true)
  })
  it(`returns false if array contains elements not in the input set`, () => {
    const output = numbers._comprises(
      `sleep`, `exercise`, `nutrition`, `love`, `gamer fuel`
    )
    expect(output).toBe(false)
  })
})

describe(`Array.prototype._overlaps()`, () => {
  it(`returns number of matched elements between arrays`, () => {
    const output = importantThings._overlaps(
      `exercise`, `anguish`,
    )
    expect(output).toBe(1)
  })
})

describe(`Array.prototype._excludes()`, () => {
  it(`returns true if each of the specified items are not in the array`, () => {
    const output = importantThings._excludes(
      `torment`, `anguish`,
    )
    expect(output).toBe(true)
  })
})
