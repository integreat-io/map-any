export type MapReturnType<El, Ret, Els> = Els extends El[]
  ? Ret[]
  : Els extends { map: (...args: never[]) => infer U }
  ? U
  : Ret

export type Fun<El, Ret> = (value: El, index?: number, array?: El[]) => Ret

export type UnaryMapper<El, Ret, Els extends El | Mappable<El, Ret>> = (
  elements: Els
) => Els extends Mappable<El, Ret> ? Ret[] : Ret

export interface Mappable<El, Ret> {
  map: (cb: Fun<El, Ret>) => Mappable<El, Ret>
}

export type AsyncFun<El, Ret> = (
  value: El,
  index?: number,
  array?: El[]
) => Promise<Ret>

export type AsyncUnaryMapper<El, Ret, Els extends El | El[]> = (
  elements: Els
) => Promise<Els extends El[] ? Ret[] : Ret>
