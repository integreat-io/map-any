/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Fix typing to avoid using `any`

type AsyncReturnType<T extends (...args: any) => Promise<any> | any> =
  T extends (...args: any) => Promise<infer R> ? R : any

type MapReturnType<T, F extends Fun> = T extends (infer U)[]
  ? U[]
  : T extends { map: (...args: any[]) => infer U }
  ? U
  : AsyncReturnType<F>

type Fun = (value: any, index?: number, array?: any) => Promise<any>

interface Mappable {
  map: (functor: Fun) => any
}

const isMappable = <T>(obj: T | Mappable): obj is Mappable =>
  typeof obj === 'object' &&
  obj !== null &&
  typeof (obj as Mappable).map === 'function'

async function map<T, F extends Fun>(cb: F, mapee: T | Mappable) {
  if (Array.isArray(mapee)) {
    return await Promise.all(mapee.map(cb))
  } else {
    return isMappable<T>(mapee) ? await mapee.map(cb) : await cb(mapee, 0, [mapee])
  }
}

function mapAny<F extends Fun>(cb: F): <T>(mapee: T) => Promise<MapReturnType<T, F>> {
  return async (uniMapee) => await map(cb, uniMapee)
}

export default mapAny
