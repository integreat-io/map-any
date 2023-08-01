type Fun<El, Ret> = (value: El, index?: number, array?: El[]) => Ret

type UnaryMapper<El, Ret, Els extends El | Mappable<El, Ret>> = (elements: Els) => Els extends Mappable<El, Ret> ? Ret[] : Ret

interface Mappable<El, Ret> {
  map: (cb: Fun<El, Ret>) => Mappable<El, Ret>
}

type MapReturnType<El, Ret, Els> = Els extends El[] ? Ret[] : Els extends { map: (...args: never[]) => infer U } ? U : Ret

const isMappable = <El, Ret>(value: El | Mappable<El, Ret>): value is Mappable<El, Ret> =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Mappable<El, Ret>).map === 'function'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWithMap<El, Ret>(cb: Fun<El, Ret>, elements: Mappable<El, Ret>): any {
  return elements.map(cb)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapOne<El, Ret>(cb: Fun<El, Ret>, element: El): any {
  return cb(element, 0, [element])
}

const mapper = <El, Ret>(cb: Fun<El, Ret>, elements: El | Mappable<El, Ret>) =>
  (isMappable<El, Ret>(elements)) ? mapWithMap(cb, elements) : mapOne(cb, elements as El)

function mapAny<El, Ret, Els extends El | Mappable<El, Ret>>(cb: Fun<El, Ret>): UnaryMapper<El, Ret, Els>
function mapAny<El, Ret, Els extends El | Mappable<El, Ret>>(cb: Fun<El, Ret>, elements: Els): MapReturnType<El, Ret, Els>
function mapAny<El, Ret, Els extends El | Mappable<El, Ret>>(cb: Fun<El, Ret>, elements?: Els): MapReturnType<El, Ret, Els> | UnaryMapper<El, Ret, Els> {
  const argLength = arguments.length
  const isUnary = (_el?: Els): _el is undefined => argLength === 1

  if (isUnary(elements)) {
    return (elements: Els) => mapper(cb, elements)
  } else {
    return mapper(cb, elements)
  }
}

export default mapAny
