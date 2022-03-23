import type { NextApiRequest, NextApiResponse } from 'next'
import { nexTrip, handleError, Place } from '@services/nextrip'
import { getQueryParam } from '@utils/getQueryParam'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Place[]>
) {
  const route_id = getQueryParam('route_id', req.query) ?? ''
  const direction_id = getQueryParam('direction_id', req.query) ?? ''

  try {
    const { data } = await nexTrip.stopsDetail(route_id, Number(direction_id))
    res.setHeader('cache-control', 'max-age=300')
    res.json(data)
  } catch (error) {
    await handleError(res, error)
  }
}