import type { NextApiRequest, NextApiResponse } from 'next'
import { nexTrip, handleError, NexTripResult } from '@services/nextrip'
import { getQueryParam } from '@utils/getQueryParam'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NexTripResult>
) {
  const route_id = getQueryParam('route_id', req.query) ?? ''
  const direction_id = getQueryParam('direction_id', req.query) ?? ''
  const stop_id = getQueryParam('stop_id', req.query) ?? ''

  try {
    const { data } = await nexTrip.nextripv2Detail2(route_id, Number(direction_id), stop_id)
    res.setHeader('cache-control', 'max-age=30')
    res.json(data)
  } catch (error) {
    await handleError(res, error)
  }
}
