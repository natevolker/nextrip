import type { NextApiRequest, NextApiResponse } from 'next'
import { nexTrip, handleError, Direction } from '@services/nextrip'
import { getQueryParam } from '@utils/getQueryParam'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Direction[]>
) {
  const route_id = getQueryParam('route_id', req.query) ?? ''
  
  try {
    const { data } = await nexTrip.directionsDetail(route_id)
    res.setHeader('cache-control', 'max-age=300')
    res.json(data)
  } catch (error) {
    await handleError(res, error)
  }
}