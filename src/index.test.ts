import test from 'ava'

import mapAny from './index.js'

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
const doubleIfNumber = (value: unknown) => typeof value === 'number' ? value * 2 : undefined

class Box {
  constructor(value: number) {
    this.value = value
  }
  value: number
  map(mapper: (value: number) => number) {
    return new Box(mapper(this.value))
  }
}

// Tests

test('should map array', t => {
  const items = [1, 2, 3]
  const expected = [2, 3, 4]

  const ret = mapAny(addOne, items)

  t.deepEqual(ret, expected)
})

test('should map object', t => {
  const item = 4
  const expected = 5

  const ret = mapAny(addOne, item)

  t.deepEqual(ret, expected)
})

test('should map null', t => {
  const expected = { id: 0 }

  const ret = mapAny(setId, null)

  t.deepEqual(ret, expected)
})

test('should map undefined', t => {
  const expected = { id: 0 }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ret = mapAny(setId, undefined as any)

  t.deepEqual(ret, expected)
})

test('should handle several return types', t => {
  const items = [1, 2, 'bill', 3, new Date()]
  const expected = [2, 4, undefined, 6, undefined]

  const ret = mapAny(doubleIfNumber, items)

  t.deepEqual(ret, expected)
})

test('should provide original array', t => {
  const expectedArr = [{ last: false }, { last: false }, { last: true }]
  const expectedObj = { last: true }

  const retArr = mapAny(markLast, arr)
  const retObj = mapAny(markLast, obj)

  t.deepEqual(retArr, expectedArr)
  t.deepEqual(retObj, expectedObj)
})

test('should map object with map method', t => {
  const box = new Box(5)

  const ret = mapAny(addOne, box)

  t.true(ret instanceof Box)
  t.is(ret.value, 6)
})

test('should map array as unary', t => {
  const items = [1, 2, 3]
  const expected = [2, 3, 4]

  const ret = mapAny(addOne)(items)

  t.deepEqual(ret, expected)
})

test('should map object as unary', t => {
  const item = 4
  const expected = 5

  const ret = mapAny(addOne)(item)

  t.deepEqual(ret, expected)
})

test('should map object with map method as unary', t => {
  const box = new Box(5)

  const ret = mapAny(addOne)(box)

  t.true(ret instanceof Box)
  t.is((ret as unknown as Box).value, 6) // The typing is wrong for unary here :(
})
