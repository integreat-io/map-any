import { isUnary } from './utils/is.js'
import type { AsyncFun, MapReturnType, AsyncUnaryMapper } from './types.js'

const isMappable = <El>(value: El | El[]): value is El[] => Array.isArray(value)

const mapper = async <El, Ret>(
  cb: AsyncFun<El, Ret>,
  elements: El | El[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> =>
  isMappable<El>(elements)
    ? await Promise.all(elements.map(cb))
    : await cb(elements, 0, [elements])

function mapAny<El, Ret, Els extends El | El[]>(
  cb: AsyncFun<El, Ret>
): AsyncUnaryMapper<El, Ret, Els>
function mapAny<El, Ret, Els extends El | El[]>(
  cb: AsyncFun<El, Ret>,
  elements: Els
): Promise<MapReturnType<El, Ret, Els>>
function mapAny<El, Ret, Els extends El | El[]>(
  cb: AsyncFun<El, Ret>,
  elements?: Els
): Promise<MapReturnType<El, Ret, Els>> | AsyncUnaryMapper<El, Ret, Els> {
  if (isUnary(elements, arguments.length)) {
    return (elements: Els) => mapper(cb, elements)
  } else {
    return mapper(cb, elements)
  }
}

export default mapAny
