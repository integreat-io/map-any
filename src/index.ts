namespace mapAny {
  export interface Callback<T> {
    (value: T, index?: number, array?: T[]): any
  }
}

const map = (cb: mapAny.Callback<any>, mapee: any) =>
  (mapee !== null && typeof mapee.map === 'function')
    ? mapee.map(cb)
    : cb(mapee, 0, [mapee])

function mapAny (cb: mapAny.Callback<any>): (mapee: any) => any
function mapAny (cb: mapAny.Callback<any>, mapee: any): any
function mapAny (cb: mapAny.Callback<any>, mapee?: any) {
  return (typeof mapee === 'undefined')
    ? (mapee: any) => map(cb, mapee)
    : map(cb, mapee)
}

export = mapAny
