# mapAny

Map mappables (functors) and simple objects (non-functors).

[![npm Version](https://img.shields.io/npm/v/map-any.svg)](https://www.npmjs.com/package/map-any)
[![Build Status](https://travis-ci.org/kjellorten/map-any.svg?branch=master)](https://travis-ci.org/kjellorten/map-any)
[![Coverage Status](https://coveralls.io/repos/github/kjellorten/map-any/badge.svg?branch=master)](https://coveralls.io/github/kjellorten/map-any?branch=master)

When a `.map()` method is present, it is used. For objects without a `.map()`
method, the callback is called with the object as first argument. The ES6 array
syntax is used, so the callback will also be given an index (always `0`) and
the original array (`[object]`).

This is useful when your code will treat an object or an array of objects the
same way, and you're supposed to return an object when an object is given.

```
const mapAny = require('map-any')

const arr = [1, 2, 3, 4, 5]
const num = 10
const callback = (x) => x + 1

mapAny(callback, arr)
// --> [2, 3, 4, 5, 6]

mapAny(callback, num)
// --> 11
```

It's curried as well:
```
const mapAny = require('map-any')
const setRunningId = mapAny((x, index) => ({ ...x, id: index}))

setRunningId([{}, {}, {}])
// --> [{ id: 0 }, { id: 1 }, { id: 2 }]

setRunningId({})
// --> { id: 0 }
```

## Getting started

### Prerequisits

Requires node v6.

### Installing and using

Install from npm:

```
npm install map-any --save
```

### Running the tests

The tests can be run with `npm test`.

## Contributing

Please read
[CONTRIBUTING](https://github.com/kjellmorten/map-any/blob/master/CONTRIBUTING.md)
for details on our code of conduct, and the process for submitting pull
requests.

## License

This project is licensed under the ISC License - see the
[LICENSE](https://github.com/kjellmorten/map-any/blob/master/LICENSE)
file for details.
