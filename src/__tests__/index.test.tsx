import { render, screen } from '@testing-library/preact'
import { LoadingContext } from '@components/LoadingContext'
import Home from '@pages/[[...slug]]'

const fixture = {"stops":[{"stop_id":49441,"latitude":44.975235,"longitude":-93.274242,"description":"9th St S & Nicollet Mall"}],"alerts":[{"stop_closed":false,"alert_text":"Route 9 detoured off Glenwood from Lyndale to 11th St/10th St until further notice due to Green Line Extension(SWLRT) construction"}],"departures":[{"actual":true,"trip_id":"19989416-DEC21-MVS-BUS-Weekday-01","stop_id":49441,"departure_text":"Due","departure_time":1648037780,"description":"Bryn Mawr / West End / Louisiana TC","route_id":"9","route_short_name":"9","direction_id":1,"direction_text":"WB","terminal":"C","schedule_relationship":"Scheduled"},{"actual":false,"trip_id":"19989417-DEC21-MVS-BUS-Weekday-01","stop_id":49441,"departure_text":"7:47","departure_time":1648039620,"description":"Bryn Mawr / West End / Louisiana TC","route_id":"9","route_short_name":"9","direction_id":1,"direction_text":"WB","terminal":"C","schedule_relationship":"Scheduled"},{"actual":false,"trip_id":"19989405-DEC21-MVS-BUS-Weekday-01","stop_id":49441,"departure_text":"8:17","departure_time":1648041420,"description":"Bryn Mawr / West End / Greenbrier","route_id":"9","route_short_name":"9","direction_id":1,"direction_text":"WB","terminal":"N","schedule_relationship":"Scheduled"},{"actual":false,"trip_id":"19989406-DEC21-MVS-BUS-Weekday-01","stop_id":49441,"departure_text":"8:50","departure_time":1648043400,"description":"Bryn Mawr / West End / Greenbrier","route_id":"9","route_short_name":"9","direction_id":1,"direction_text":"WB","terminal":"N","schedule_relationship":"Scheduled"}]}

describe('Home', () => {
  it('renders a heading', () => {
    render(
      <LoadingContext>
        <Home route_id={null} direction_id={null} stop_id={null} routes={null} directions={null} stops={null} departures={null} />
      </LoadingContext>
    )

    const heading = screen.getByText(/Real-Time Departures/)
    expect(heading).toBeInTheDocument()
  })
})

it('renders with no args', () => {
  const { container } = render(
    <LoadingContext>
      <Home route_id={null} direction_id={null} stop_id={null} routes={null} directions={null} stops={null} departures={null} />
    </LoadingContext>
  )
  expect(container).toMatchSnapshot()
})

it('renders with all args', () => {
  const { container } = render(
    <LoadingContext>
      <Home route_id={'1'} direction_id={'1'} stop_id={'1'} routes={[]} directions={[]} stops={[]} departures={fixture} />
    </LoadingContext>
  )
  expect(container).toMatchSnapshot()
})