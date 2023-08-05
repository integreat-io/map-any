# mapAny

Map both mappables (functors) and other variables (non-functors).

[![npm Version](https://img.shields.io/npm/v/map-any.svg)](https://www.npmjs.com/package/map-any)
[![Maintainability](https://api.codeclimate.com/v1/badges/c7620cb5749e5e4b66ff/maintainability)](https://codeclimate.com/github/integreat-io/map-any/maintainability)

`mapAny` is a function that accepts a callback function and a variable to map
over. When the variable does not have a `.map()` method, the callback is called
right away, with the variable as first argument. For a variable that implements
its own `.map()` method, that method is called instead.

The main motivation for `mapAny` is to have one way to apply a function to
objects, when you don't know whether you'll get an array of objects or just an
object. The result of this application will not be an array unless the input was
an array. This could be accomplished through containers in a functional
programming fashion, but `mapAny` is for cases where you don't use containers.

The ES6 `Array.prototype.map()` syntax is used for the callback's signature:
`function callback(currentValue[, index[, array]]) { // Return new element }`.
When called with variable without a `.map()` method, the index will be `0`
and the array will have one item, namely the provided variable.

An example:

```
import mapAny from 'map-any'

const arr = [1, 2, 3, 4, 5]
const num = 10
const callback = (x) => x + 1

mapAny(callback)(arr)
// --> [2, 3, 4, 5, 6]

mapAny(callback)(num)
// --> 11
```

As it's curried, you may use it to create a mapper as well:

```
import mapAny from 'map-any'
const setRunningId = mapAny((x, index) => ({ ...x, id: index}))

setRunningId([{}, {}, {}])
// --> [{ id: 0 }, { id: 1 }, { id: 2 }]

setRunningId({})
// --> { id: 0 }
```

There's also an async version, that accepts a function that returns a promise:

```
import mapAny from 'map-any/async.js'

const arr = [1, 2, 3, 4, 5]
const num = 10
const callback = async (x) => x + 1 // This function returns a promise

await mapAny(callback)(arr)
// --> [2, 3, 4, 5, 6]

await mapAny(callback)(num)
// --> 11
```

_Note:_ `mapAny` also supports mapping over any object with a `.map()` method,
but this does not work with the async version, and the sync version will mess up
the typing when used curried with object with `.map()` (other than arrays). We
hope to fix this in a future version, but for now it's not a priority.

## Getting started

### Prerequisits

Requires node v18.

### Installing and using

Install from npm:

```
npm i map-any
```

### Running the tests

The tests can be run with `npm test`.

## Contributing

Please read
[CONTRIBUTING](https://github.com/integreat-io/map-any/blob/master/CONTRIBUTING.md)
for details on our code of conduct, and the process for submitting pull
requests.

## License

This project is licensed under the ISC License - see the
[LICENSE](https://github.com/integreat-io/map-any/blob/master/LICENSE)
file for details.
