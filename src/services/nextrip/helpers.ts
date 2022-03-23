import type { NextApiResponse } from 'next'

export const handleError = async (
  res: NextApiResponse,
  error: any
) => {
  if ('status' in error) {
    res.status(error.status)
  }

  if ('headers' in error && 'forEach' in error.headers) {
    error.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value)
    })
  }

  if ('body' in error && 'on' in error.body) {
    const chunks: Buffer[] = []
    const body = await new Promise((resolve, reject) => {
      if (error.body.readableEnded) {
        resolve(Buffer.concat(chunks))
      }
      error.body.on('data', (chunk: ArrayBuffer) => chunks.push(Buffer.from(chunk)))
      error.body.on('error', (err: any) => reject(err))
      error.body.on('end', () => resolve(Buffer.concat(chunks)))
    })
    res.send(body)
  }
}