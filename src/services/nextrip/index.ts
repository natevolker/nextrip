import { fetch } from '@utils/fetch'
import { Route, Direction, Place, NexTripResult, Api as NexTrip } from './generated'

export const getRoutes = async () =>
  fetch<Route[]>(`http://localhost:3000/api/routes`)

export const getDirections = async (route_id: string) =>
  fetch<Direction[]>(`http://localhost:3000/api/directions?route_id=${route_id}`)

export const getStops = async (route_id: string, direction_id: string | number) =>
  fetch<Place[]>(`http://localhost:3000/api/stops?route_id=${route_id}&direction_id=${direction_id}`)

export const getDepartures = async (
  route_id: string,
  direction_id: string | number,
  stop_id: string
) => fetch<NexTripResult>(
  `http://localhost:3000/api/departures?route_id=${route_id}&direction_id=${direction_id}&stop_id=${stop_id}`
)

export const { nextripv2: nexTrip } = new NexTrip({
  baseUrl: 'https://svc.metrotransit.org',
})

export { NexTrip }
export type { Route, Direction, Place, NexTripResult }
export * from './helpers'
