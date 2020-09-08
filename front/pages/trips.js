import { getAllData } from '@/lib/api'
import PropTypes from 'prop-types'

import TripsList from '@/components/Trips/TripsList'

const TripsPage = ({ allTrips }) => {
  return (
    <section className="trips">
      <TripsList items={allTrips} />
    </section>
  )
}

export async function getStaticProps() {
  const allTrips = (await getAllData('trips')) || []

  return {
    props: {
      allTrips
    }
  }
}

TripsPage.propTypes = {
  allTrips: PropTypes.array.isRequired
}

export default TripsPage
