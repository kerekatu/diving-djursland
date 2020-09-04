import { getAllData } from '@/lib/api'
import PropTypes from 'prop-types'

const Trips = ({ allTrips }) => {
  return (
    <div>
      {allTrips.map((trip, index) => (
        <div key={index}>{trip.title}</div>
      ))}
    </div>
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

Trips.propTypes = {
  allTrips: PropTypes.array.isRequired
}

export default Trips
