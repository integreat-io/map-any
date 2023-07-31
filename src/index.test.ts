import test from 'ava'

import mapAny from '.'

// Setup

interface TestObject {
  id?: number
  last?: boolean
}

const arr = [{}, {}, {}]
const obj = {}
const setId = (obj: TestObject | null, index?: number) => ({
  ...obj,
  id: index
})
const markLast = (obj: TestObject | null, index?: number, array?: unknown[]) => ({
  ...obj,
  last: !!array && index === array.length - 1
})
const addOne = (value: number) => value + 1

class Box {
  constructor(value: number) {
    this.value = value
  }
  value: number
  map(functor: (value: number) => number) {
    return new Box(functor(this.value))
  }
}

// Tests

test('should map array', t => {
  const items = [1, 2, 3]
  const expected = [2, 3, 4]

  const ret = mapAny(addOne)(items)

  t.deepEqual(ret, expected)
})

test('should map object', t => {
  const item = 4
  const expected = 5

  const ret = mapAny(addOne)(item)

  t.deepEqual(ret, expected)
})

test('should map null', t => {
  const expected = { id: 0 }

  const ret = mapAny(setId)(null)

  t.deepEqual(ret, expected)
})

test('should map undefined', t => {
  const expected = { id: 0 }

  const ret = mapAny(setId)(undefined)

  t.deepEqual(ret, expected)
})

test('should provide original array', t => {
  const expectedArr = [{ last: false }, { last: false }, { last: true }]
  const expectedObj = { last: true }

  const retArr = mapAny(markLast)(arr)
  const retObj = mapAny(markLast)(obj)

  t.deepEqual(retArr, expectedArr)
  t.deepEqual(retObj, expectedObj)
})

test('should map object with map method', t => {
  const box = new Box(5)

  const ret = mapAny(addOne)(box)

  t.true(ret instanceof Box)
  t.is(ret.value, 6)
})
