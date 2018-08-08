import test from 'ava'

import * as mapAny from '.'

// Helpers

const arr = [{}, {}, {}]
const obj = {}
const setId: mapAny.Callback<{}> = (obj, index) => ({ ...obj, id: index })
const markLast: mapAny.Callback<{}> = (obj, index, array) => ({ ...obj, last: array && index === array.length - 1 })

// Tests

test('should map array', (t) => {
  const expected = [{ id: 0 }, { id: 1 }, { id: 2 }]
  const ret = mapAny(setId, arr)

  t.deepEqual(ret, expected)
})

test('should map object', (t) => {
  const expected = { id: 0 }
  const ret = mapAny(setId, obj)

  t.deepEqual(ret, expected)
})

test('should map null', (t) => {
  const expected = { id: 0 }
  const ret = mapAny(setId, null)

  t.deepEqual(ret, expected)
})

test('should map undefined', (t) => {
  const expected = { id: 0 }
  const ret = mapAny(setId, undefined)

  t.deepEqual(ret, expected)
})

test('should provide original array', (t) => {
  const expectedArr = [{ last: false }, { last: false }, { last: true }]
  const expectedObj = { last: true }

  const retArr = mapAny(markLast, arr)
  const retObj = mapAny(markLast, obj)

  t.deepEqual(retArr, expectedArr)
  t.deepEqual(retObj, expectedObj)
})

test('should be curried', (t) => {
  const expectedArr = [{ id: 0 }, { id: 1 }, { id: 2 }]
  const expectedObj = { id: 0 }
  const map = mapAny(setId)

  t.deepEqual(map(arr), expectedArr)
  t.deepEqual(map(obj), expectedObj)
})

test('should not throw when given undefined', (t) => {
  const expected = { id: 0 }

  const map = mapAny(setId)

  t.deepEqual(map(undefined), expected)
})
