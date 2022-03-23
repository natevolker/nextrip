import type { NextApiRequest, NextApiResponse } from 'next'
import { nexTrip, handleError, Route } from '@services/nextrip'

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Route[]>
) {
  try {
    const { data } = await nexTrip.routesList()
    res.setHeader('cache-control', 'max-age=300')
    res.json(data)
  } catch (error) {
    await handleError(res, error)
  }
}