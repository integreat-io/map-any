import { isUnary } from './utils/is.js'
import type { Fun, MapReturnType, UnaryMapper, Mappable } from './types.js'

const isMappable = <El, Ret>(
  value: El | Mappable<El, Ret>
): value is Mappable<El, Ret> =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Mappable<El, Ret>).map === 'function'

const mapper = <El, Ret>(
  cb: Fun<El, Ret>,
  elements: El | Mappable<El, Ret>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any =>
  isMappable<El, Ret>(elements) ? elements.map(cb) : cb(elements, 0, [elements])

function mapAny<El, Ret, Els extends El | Mappable<El, Ret>>(
  cb: Fun<El, Ret>
): UnaryMapper<El, Ret, Els>
function mapAny<El, Ret, Els extends El | Mappable<El, Ret>>(
  cb: Fun<El, Ret>,
  elements: Els
): MapReturnType<El, Ret, Els>
function mapAny<El, Ret, Els extends El | Mappable<El, Ret>>(
  cb: Fun<El, Ret>,
  elements?: Els
): MapReturnType<El, Ret, Els> | UnaryMapper<El, Ret, Els> {
  if (isUnary(elements, arguments.length)) {
    return (elements: Els) => mapper(cb, elements)
  } else {
    return mapper(cb, elements)
  }
}

export default mapAny
