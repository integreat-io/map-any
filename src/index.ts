namespace mapAny {
  export interface Functor<T, U = T> {
    (value: T, index?: number, array?: T[]): U
  }

  export interface Mappable<T, U> {
    map: Functor<T, U>
  }
}

const isMappable = (obj: any): obj is mapAny.Mappable<any, any> =>
  typeof obj === 'object' && obj !== null && typeof obj.map === 'function'

function map<T = any, U = any> (cb: mapAny.Functor<T, U>, mapee: T | T[]): U | U[] {
  return (isMappable(mapee))
    ? mapee.map(cb)
    : cb(mapee as T, 0, [mapee as T])
}

function mapAny<T = any, U = any> (cb: mapAny.Functor<T, U>): (mapee: T) => U
function mapAny<T = any, U = any> (cb: mapAny.Functor<T, U>): (mapee: T[]) => U[]
function mapAny<T = any, U = any> (cb: mapAny.Functor<T, U>, mapee: T): U
function mapAny<T = any, U = any> (cb: mapAny.Functor<T, U>, mapee: T[]): U[]
function mapAny<T = any, U = any> (cb: mapAny.Functor<T, U>, mapee?: T | T[]): U | U[] | ((mapee: T | T[]) => U | U[]) {
  const argCount = arguments.length
  function isUnary<V> (_arg?: V): _arg is undefined {
    return argCount === 1 // This function is basically just for typing `mapee` correctly
  }

  return (isUnary(mapee))
    ? (mapee: any) => map(cb, mapee)
    : map(cb, mapee)
}

export = mapAny
