export const toError = (
  err: unknown,
  { message, ...info }: { message: string } & { [key: string]: any }
) => {
  if (typeof err === 'string') {
    return Object.assign(new Error(err), info)
  }
  if (typeof err === 'object' && err !== null) {
    Object.assign(new Error(message), { ...info, ...err })
  }
  return Object.assign(new Error(message), info)
}