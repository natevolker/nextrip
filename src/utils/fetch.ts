import makeFetchHappen from 'make-fetch-happen'
import { normalize } from 'path'
import { toError } from './toError'

const cachedFetch = makeFetchHappen.defaults({
  cachePath: normalize(`.next/cache/fetch-cache`),
})

export const fetch = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  let response: Response | null = null

  try {
    response = (await cachedFetch(input, init as makeFetchHappen.FetchOptions)) as unknown as Response
  } catch (err) {
    throw toError(err, { message: 'Failed to fetch', input, init })
  }

  let result: any = null
  let error: unknown = null

  if (response.headers.get('content-type')?.includes('json')) {
    try {
      result = await response.json()
    } catch (err) {
      error = err
    }
  }

  if (!error && result === null) {
    try {
      result = await response.text()
    } catch (err) {
      error = err
    }
  }

  if (error || response.status < 200 || response.status >= 300) {
    throw toError(error, {
      message: 'Could not read HTTP response',
      status: response.status,
      statusText: response.statusText,
      input,
      init,
    })
  }

  return result
}
