type Fun<El, Ret> = (value: El, index?: number, array?: El[]) => Ret extends Promise<infer U> ? U : Promise<Ret>

type UnaryMapper<El, Ret, Els extends El | El[]> = (elements: Els) => Promise<Els extends El[] ? Ret[] : Ret>

type MapReturnType<El, Ret, Els> = Els extends El[] ? Ret[] : Els extends { map: (...args: never[]) => infer U } ? U : Ret

const isMappable = <El>(value: El | El[]): value is El[] => Array.isArray(value)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function mapWithMap<El, Ret>(cb: Fun<El, Ret>, elements: El[]): Promise<any> {
  return await Promise.all(elements.map(cb))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function mapOne<El, Ret>(cb: Fun<El, Ret>, element: El): Promise<any> {
  return cb(element, 0, [element])
}

const mapper = async <El, Ret>(cb: Fun<El, Ret>, elements: El | El[]) =>
  (isMappable<El>(elements)) ? await mapWithMap(cb, elements) : await mapOne(cb, elements as El)

function mapAny<El, Ret, Els extends El | El[]>(cb: Fun<El, Ret>): UnaryMapper<El, Ret, Els>
function mapAny<El, Ret, Els extends El | El[]>(cb: Fun<El, Ret>, elements: Els): Promise<MapReturnType<El, Ret, Els>>
function mapAny<El, Ret, Els extends El | El[]>(cb: Fun<El, Ret>, elements?: Els): Promise<MapReturnType<El, Ret, Els>> | UnaryMapper<El, Ret, Els> {
  const argLength = arguments.length
  const isUnary = (_el?: Els): _el is undefined => argLength === 1

  if (isUnary(elements)) {
    return (elements: Els) => mapper(cb, elements)
  } else {
    return mapper(cb, elements)
  }
}

export default mapAny
