import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Route, Direction, Place, NexTripResult } from '@services/nextrip/generated'
import { Select } from '@components/Select'
import { SlideInOut } from '@components/SlideInOut'
import { useLoading } from '@components/LoadingContext'
import { Header } from '@components/Header'
import { NexTripLogo } from '@components/Icons/NexTripLogo'
import { TripPlannerLogo } from '@components/Icons/TripPlannerLogo'
import { AlertsLogo } from '@components/Icons/AlertsLogo'
import { Spinner } from '@components/Icons/Spinner'
import layout from '@components/Layout/layout.module.css'
import { TimeUntil } from '@components/TimeUntil'

interface NexTripPageProps {
  route_id: string | null,
  direction_id: string | null,
  stop_id: string | null,
  routes: Route[] | null,
  directions: Direction[] | null
  stops: Place[] | null,
  departures: NexTripResult | null,
}

interface NexTripPageParams {
  slug?: [
    route_id?: string,
    direction_id?: string,
    stop_id?: string
  ]
}

export const NexTrip: NextPage<NexTripPageProps> = (props) => {
  const router = useRouter() ?? {}
  const loading = useLoading()

  const [route_id, direction_id, stop_id] = loading.query.slug ?? []

  const routes = props.routes
  const directions = route_id === props.route_id ? props.directions : null
  const stops = direction_id === props.direction_id ? props.stops : null
  const departures = stop_id === props.stop_id || (stop_id && loading.supress) ? props.departures : null
  const stopDescription = [...new Set(departures?.stops?.map(stop => stop.description))][0] ?? '\u00a0'
  const stopNumber = departures?.stops?.map(s => s.stop_id).join(', ') ?? null

  return <>
    <Head>
      <title>NexTrip | Metro Transit</title>
      <meta name="description" content="Real-time updates while you wait. NexTrip gives the estimated departure times for buses that are approaching the stop, based on their current position" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ed1b2e"/>
      <meta name="apple-mobile-web-app-title" content="Metro Transit"/>
      <meta name="application-name" content="Metro Transit"/>
      <meta name="msapplication-TileColor" content="#0053a0"/>
      <meta name="theme-color" content="#0053a0"/>
    </Head>
    <Header>
      <Link href={router.asPath}>
        <a className='active'><NexTripLogo /> NexTrip</a>
      </Link>
      <a href="https://www.metrotransit.org/trip-planner"><TripPlannerLogo /> Trip Planner</a>
      <a href="https://www.metrotransit.org/alerts"><AlertsLogo /> Alerts</a>
    </Header>
    <form className={`${layout.sidebar} sidebar`}>
      <h2>Real-Time Departures</h2>
      <Select
        label="Route"
        description='Select a Route'
        name="route"
        value={route_id ?? ''}
        onChange={event => { router.push(`/${event.target.value}`) }}
        options={(routes ?? []).map(option => ({ key: option.route_id, value: option.route_id ?? '', label: option.route_label }))}
      />
      <Select
        label="Direction"
        description='Select a Direction'
        name="direction"
        value={direction_id ?? ''}
        disabled={!directions}
        disabledTitleText='You must first select a route'
        loading={!directions}
        onChange={event => { router.push(`/${route_id}/${event.target.value}`) }}
        options={(directions ?? []).map(option => ({ key: option.direction_id, value: option.direction_id ?? '', label: option.direction_name }))}
      />
      <Select
        label="Stop"
        description='Select a Stop'
        name="stop"
        value={stop_id ?? ''}
        disabled={!stops}
        disabledTitleText='You must first select a route and direction'
        loading={!stops}
        onChange={event => { router.push(`/${route_id}/${direction_id}/${event.target.value}`) }}
        options={(stops ?? []).map(option => ({ key: option.place_code, value: option.place_code ?? '', label: option.description }))}
      />
    </form>
    <div className={`${layout.primary} primary`}>
      {!stop_id && !departures
        ? <div className={layout.center}>
            Select a Route, Direction, and Stop to see departure times.
          </div>  
        : null
      }
      {stop_id && !loading.supress && !departures
        ? <div className={layout.center}><Spinner/></div>  
        : null
      }
      <SlideInOut>
        {departures
          ? <>
            <h2>
              {stopDescription}
              {stopNumber ? <span className='subtitle'>Stop # {stopNumber}</span> : null}
            </h2>
            <table>
              <thead>
                <tr>
                  <th>route</th>
                  <th>destination</th>
                  <th className="align-end">departs</th>
                </tr>
              </thead>
              <tbody>
              {departures?.departures?.length === 0
                ? <tr><td colSpan={3}>No departures at this time</td></tr>
                : null
              }
              {departures?.departures?.map((departure, i) => (
                <tr key={i}>
                  <td>{departure.route_short_name}{departure.terminal}</td>
                  <td>{departure.description}</td>
                  <td className="align-end"><TimeUntil timestamp={departure.departure_time}>{departure.departure_text}</TimeUntil></td>
                </tr>
              ))}
              </tbody>
            </table>
          </>
          : null
        }
      </SlideInOut>
    </div>
  </>
}

export const getStaticProps = async (
  { params: { slug = [] } }: { params: NexTripPageParams}
): Promise<{ props: NexTripPageProps, revalidate?: number}> => {
  const { getRoutes, getDirections, getStops, getDepartures } = await import('@services/nextrip')
  const requestMethods = [ getRoutes, getDirections, getStops, getDepartures ] as const

  const responses = await Promise.allSettled(
    requestMethods.map((fn, index) =>
      index <= slug.length
        ? fn(...slug.slice(0, index + 1) as [any, any, any])
        : null
    )
  )

  const {
    errors,
    results: [routes, directions, stops, departures]
  } = responses.reduce(
    (acc, settled) => ({
      ...acc,
      results: [
        ...acc.results,
        settled.status === 'fulfilled'
          ? settled.value
          : null
      ],
      errors: settled.status === 'rejected'
        ? [...acc.errors, settled.reason]
        : acc.errors
    }),
    { errors: [], results: [] } as { errors: Error[], results: (Route[] | Direction[] | Place[] | NexTripResult | null)[] }
  ) as {
    errors: Error[],
    results: [Route[] | null, Direction[] | null, Place[] | null, NexTripResult | null]
  }

  if (errors.length > 0) {
    return {
      // @ts-ignore - NextJS handles this for us
      notFound: true,
      revalidate: 30 * 60
    }
  }

  const [
    route_id = null,
    direction_id = null,
    stop_id = null
  ] = slug

  return {
    props: {
      route_id,
      direction_id,
      stop_id,
      routes,
      directions,
      stops,
      departures
    },
    revalidate: 30,
  }
}

export const getStaticPaths = async () => {
  // const { data: routes } = await getRoutes() ?? { data: [] }
  // const paths = (await Promise.all(routes.map(async ({ route_id }) => {
  //   const { data: directions } = (route_id ? await getDirections(route_id) : null) ?? { data: [] }
  //   return directions.map(direction => ({ params: { slug: [route_id, `${direction.direction_id}`] } }))
  // }))).flat()

  return {
    paths: [],
    fallback: 'blocking'
  }
}

export default NexTrip
