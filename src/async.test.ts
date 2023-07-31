import test from 'ava'

import mapAny from './async'

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

class Box {
  constructor(value: number) {
    this.value = value
  }
  value: number
  async map(functor: (value: number) => Promise<number>) {
    return new Box(await functor(this.value))
  }
}

// Tests

test('should map array', async t => {
  const items = [1, 2, 3]
  const expected = [2, 3, 4]

  const ret = await mapAny(addOne)(items)

  t.deepEqual(ret, expected)
})

test('should map object', async t => {
  const item = 4
  const expected = 5

  const ret = await mapAny(addOne)(item)

  t.deepEqual(ret, expected)
})

test('should map null', async t => {
  const expected = { id: 0 }

  const ret = await mapAny(setId)(null)

  t.deepEqual(ret, expected)
})

test('should map undefined', async t => {
  const expected = { id: 0 }

  const ret = await mapAny(setId)(undefined)

  t.deepEqual(ret, expected)
})

test('should provide original array', async t => {
  const expectedArr = [{ last: false }, { last: false }, { last: true }]
  const expectedObj = { last: true }

  const retArr = await mapAny(markLast)(arr)
  const retObj = await mapAny(markLast)(obj)

  t.deepEqual(retArr, expectedArr)
  t.deepEqual(retObj, expectedObj)
})

test('should map object with map method', async t => {
  const box = new Box(5)

  const ret = await mapAny(addOne)(box)

  t.true(ret instanceof Box)
  t.is(ret.value, 6)
})
