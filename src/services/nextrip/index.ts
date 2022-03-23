import { fetch } from '@utils/fetch'
import { Route, Direction, Place, NexTripResult, Api as NexTrip } from './generated'

const BASE_URL = process.env['NEXT_PUBLIC_VERCEL_URL'] ?? 'localhost:3000'
const PROTOCOL = BASE_URL === 'localhost:3000' ? 'http://' : 'https://'

export const getRoutes = async () =>
  fetch<Route[]>(`${PROTOCOL}${BASE_URL}/api/routes`)

export const getDirections = async (route_id: string) =>
  fetch<Direction[]>(`${PROTOCOL}${BASE_URL}/api/directions?route_id=${route_id}`)

export const getStops = async (route_id: string, direction_id: string | number) =>
  fetch<Place[]>(`${PROTOCOL}${BASE_URL}/api/stops?route_id=${route_id}&direction_id=${direction_id}`)

export const getDepartures = async (
  route_id: string,
  direction_id: string | number,
  stop_id: string
) => fetch<NexTripResult>(
  `${PROTOCOL}${BASE_URL}/api/departures?route_id=${route_id}&direction_id=${direction_id}&stop_id=${stop_id}`
)

export const { nextripv2: nexTrip } = new NexTrip({
  baseUrl: 'https://svc.metrotransit.org',
})

export { NexTrip }
export type { Route, Direction, Place, NexTripResult }
export * from './helpers'
