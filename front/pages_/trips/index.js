import { useState } from 'react'
import { getNewestTrips, getAllData } from '@/lib/api'
import PropTypes from 'prop-types'
import { formatDate, getFullDate } from '@/lib/date'

import TripsList from '@/components/Trips/TripsList'
import TripsMap from '@/components/Trips/TripsMap'
import Layout from '@/components/Layout/Layout'

const TripsPage = ({ allTrips, allMarkers }) => {
  const tripsDateCondition = allTrips.filter(
    (trip) => formatDate(trip.date, 'dMY') > getFullDate(new Date())
  )

  const [trips, setTrips] = useState(tripsDateCondition)
  const [markers, setMarkers] = useState(allMarkers)
  const [mapVisibility, setMapVisibility] = useState(true)
  const [filteredStatus, setFilteredStatus] = useState(false)

  const filterTripCategory = (filterItem) => {
    setTrips(
      trips.filter(
        (item) =>
          item.trip_category.category === filterItem.trip_category.category
      )
    )

    setMarkers(
      markers.filter(
        (item) =>
          item.trip_category.category === filterItem.trip_category.category
      )
    )

    setFilteredStatus(true)
  }

  const handleFilterStatus = () => {
    setFilteredStatus(false)
    setTrips(tripsDateCondition)
    setMarkers(allMarkers)
  }

  const handleMapVisibility = () => {
    setMapVisibility(!mapVisibility)
  }

  const handleFindTrips = (place) => {
    setTrips(trips.filter((trip) => trip.trip_places[0].title === place))
  }

  return (
    <Layout>
      <section className={mapVisibility ? 'trips' : 'trips_listing_full'}>
        <TripsList
          items={trips}
          filterItems={filterTripCategory}
          mapVisibility={mapVisibility}
          filteredStatus={filteredStatus}
          handleMapVisibility={handleMapVisibility}
          handleFilterStatus={handleFilterStatus}
        />
        {mapVisibility && (
          <TripsMap
            markers={markers}
            handleMapVisibility={handleMapVisibility}
            handleFindTrips={handleFindTrips}
            handleFilterStatus={handleFilterStatus}
          />
        )}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allTrips = (await getNewestTrips('trips')) || []
  const allMarkers = (await getAllData('map-markers', '')) || []

  return {
    props: {
      allTrips,
      allMarkers,
    },
  }
}

TripsPage.propTypes = {
  allTrips: PropTypes.array.isRequired,
  allMarkers: PropTypes.array.isRequired,
}

export default TripsPage