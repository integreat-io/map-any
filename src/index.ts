/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Fix typing to avoid using `any`

type MapReturnType<T, F extends Functor> = T extends (infer U)[]
  ? U[]
  : T extends { map: (...args: any[]) => infer U }
  ? U
  : ReturnType<F>

type Functor = (value: any, index?: number, array?: any) => any

interface Mappable {
  map: (functor: Functor) => any
}

const isMappable = <T>(obj: T | Mappable): obj is Mappable =>
  typeof obj === 'object' &&
  obj !== null &&
  typeof (obj as Mappable).map === 'function'

function map<T, F extends Functor>(cb: F, mapee: T | Mappable) {
  return isMappable<T>(mapee) ? mapee.map(cb) : cb(mapee, 0, [mapee])
}

function mapAny<F extends Functor>(cb: F): <U>(mapee: U) => MapReturnType<U, F>
function mapAny<T, F extends Functor>(cb: F, mapee: T): MapReturnType<T, F>
function mapAny<T, U, F extends Functor>(cb: F, mapee?: T): any {
  const argCount = arguments.length

  // This function is basically just for typing `mapee` correctly
  const isUnary = (_arg?: any): _arg is undefined => argCount === 1

  return isUnary(mapee) ? (uniMapee: U) => map(cb, uniMapee) : map(cb, mapee)
}

export = mapAny
