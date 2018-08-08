namespace mapAny {
  export interface Callback<T> {
    (value: T, index?: number, array?: [T]): any
  }
}

const isObject = (obj: any) =>
  typeof obj === 'object' && obj !== null && obj !== undefined

const map = (cb: mapAny.Callback<any>, mapee: any) =>
  (isObject(mapee) && typeof mapee.map === 'function')
    ? mapee.map(cb)
    : cb(mapee, 0, [mapee])

function mapAny (cb: mapAny.Callback<any>): (mapee: any) => any
function mapAny (cb: mapAny.Callback<any>, mapee: any): any
function mapAny (cb: mapAny.Callback<any>, mapee?: any) {
  return (arguments.length === 1)
    ? (mapee: any) => map(cb, mapee)
    : map(cb, mapee)
}

export = mapAny
