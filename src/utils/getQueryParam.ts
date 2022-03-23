export const getQueryParam: {
  <T extends string, U extends { [P in T]: string }>(key: T, params: U): U[T],
  <T extends string, U extends { [P in T]: string[] }>(key: T, params: U): U[T][number]
  <T extends string, U extends { [key: string]: string | string[] }>(key: T, params: U): string | null
} = (
  key: string,
  params: { [key: string]: string | string[] },
) => {
  if (!(key in params)) {
    return null
  }
  return Array.isArray(params[key])
    ? params[key][params[key].length - 1]
    : (params[key] as string)
}