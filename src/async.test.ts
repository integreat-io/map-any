import test from 'ava'

import mapAny from './async.js'

// Setup

interface TestObject {
  id?: number
  last?: boolean
}

const arr = [{}, {}, {}]
const obj = {}
const setId = async (obj: TestObject | null, index?: number) => ({
  ...obj,
  id: index
})
const markLast = async (obj: TestObject | null, index?: number, array?: unknown[]) => ({
  ...obj,
  last: !!array && index === array.length - 1
})
const addOne = async (value: number) => value + 1
const doubleIfNumber = async (value: unknown) => typeof value === 'number' ? value * 2 : undefined

// Tests

test('should map array', async t => {
  const items = [1, 2, 3]
  const expected = [2, 3, 4]

  const ret = await mapAny(addOne, items)

  t.deepEqual(ret, expected)
})

test('should map object', async t => {
  const item = 4
  const expected = 5

  const ret = await mapAny(addOne, item)

  t.deepEqual(ret, expected)
})

test('should map null', async t => {
  const expected = { id: 0 }

  const ret = await mapAny(setId, null)

  t.deepEqual(ret, expected)
})

test('should map undefined', async t => {
  const expected = { id: 0 }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ret = await mapAny(setId, undefined as any)

  t.deepEqual(ret, expected)
})

test('should handle several return types', async t => {
  const items = [1, 2, 'bill', 3, new Date()]
  const expected = [2, 4, undefined, 6, undefined]

  const ret = await mapAny(doubleIfNumber, items)

  t.deepEqual(ret, expected)
})

test('should provide original array', async t => {
  const expectedArr = [{ last: false }, { last: false }, { last: true }]
  const expectedObj = { last: true }

  const retArr = await mapAny(markLast, arr)
  const retObj = await mapAny(markLast, obj)

  t.deepEqual(retArr, expectedArr)
  t.deepEqual(retObj, expectedObj)
})

test('should map array as unary', async t => {
  const items = [1, 2, 3]
  const expected = [2, 3, 4]

  const ret = await mapAny(addOne)(items)

  t.deepEqual(ret, expected)
})

test('should map object as unary', async t => {
  const item = 4
  const expected = 5

  const ret = await mapAny(addOne)(item)

  t.deepEqual(ret, expected)
})

