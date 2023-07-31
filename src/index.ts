/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Fix typing to avoid using `any`

type MapReturnType<T, F extends Fun> = T extends (infer U)[]
  ? U[]
  : T extends { map: (...args: any[]) => infer U }
  ? U
  : ReturnType<F>

type Fun = (value: any, index?: number, array?: any) => any

interface Mappable {
  map: (functor: Fun) => any
}

const isMappable = <T>(obj: T | Mappable): obj is Mappable =>
  typeof obj === 'object' &&
  obj !== null &&
  typeof (obj as Mappable).map === 'function'

function map<T, F extends Fun>(cb: F, mapee: T | Mappable) {
  return isMappable<T>(mapee) ? mapee.map(cb) : cb(mapee, 0, [mapee])
}

function mapAny<F extends Fun>(cb: F): <T>(mapee: T) => MapReturnType<T, F> {
  return (uniMapee) => map(cb, uniMapee)
}

export default mapAny
