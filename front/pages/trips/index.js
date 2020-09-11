import { getNewestTrips, getAllData } from '@/lib/api'
import PropTypes from 'prop-types'

import TripsList from '@/components/Trips/TripsList'
import TripsMap from '@/components/Trips/TripsMap'

const TripsPage = ({ allTrips, allMarkers }) => {
  return (
    <section className="trips">
      <TripsList items={allTrips} />
      <TripsMap markers={allMarkers} />
    </section>
  )
}

// ! Add Static Links

export async function getStaticProps() {
  const allTrips = (await getNewestTrips('trips')) || []
  const allMarkers = (await getAllData('map-markers', '')) || []

  return {
    props: {
      allTrips,
      allMarkers
    }
  }
}

TripsPage.propTypes = {
  allTrips: PropTypes.array.isRequired,
  allMarkers: PropTypes.array.isRequired
}

export default TripsPage
