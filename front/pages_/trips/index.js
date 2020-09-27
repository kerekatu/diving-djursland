import { useState } from 'react'
import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'

import { getFilteredDate } from '@/lib/date'
import { getNewestTrips, getAllData } from '@/lib/api'

import TripsList from '@/components/Trips/TripsList'
import TripsMap from '@/components/Trips/TripsMap'
import Layout from '@/components/Layout/Layout'

const TripsPage = ({ allTrips, allMarkers }) => {
  const tripsDateCondition = allTrips.filter((trip) =>
    getFilteredDate(trip.date)
  )

  const [trips, setTrips] = useState(tripsDateCondition)
  const [markers, setMarkers] = useState(allMarkers)
  const [mapVisibility, setMapVisibility] = useState(true)
  const [filteredStatus, setFilteredStatus] = useState(false)
  const [hoveredMarker, setHoveredMarker] = useState(null)

  const filterTripCategory = (filterItem) => {
    setTrips(
      trips.filter(
        (item) =>
          item.trip_places[0].trip_category ===
          filterItem.trip_places[0].trip_category
      )
    )

    setMarkers(
      markers.filter(
        (item) =>
          item.trip_place.trip_category ===
          filterItem.trip_places[0].trip_category
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

  const hoverMarkerWithTrip = (trip) => {
    if (!trip) {
      setHoveredMarker(null)
    }

    setHoveredMarker(trip)
  }

  return (
    <>
      <NextSeo
        title="Diving Djursland - Dykkerture"
        description="Har du taget certifikat for nylig og har brug for lidt mere erfaring er vores guidede ture lige noget for dig. Vi dykker forskellige destinationer alt efter vind og vejr så du har mulighed for at prøve lidt forskelligt. Er det længere tid siden du har dykket er det også en mulighed for en genopfriskning af dine dykkerfærdigheder eller bare."
      />
      <Layout containedWidth={!mapVisibility}>
        <section className={mapVisibility ? 'trips' : 'trips_full'}>
          <TripsList
            items={trips}
            filterItems={filterTripCategory}
            mapVisibility={mapVisibility}
            filteredStatus={filteredStatus}
            handleMapVisibility={handleMapVisibility}
            handleFilterStatus={handleFilterStatus}
            hoverMarkerWithTrip={hoverMarkerWithTrip}
          />

          {mapVisibility && (
            <TripsMap
              markers={markers}
              filteredStatus={filteredStatus}
              handleMapVisibility={handleMapVisibility}
              handleFindTrips={handleFindTrips}
              handleFilterStatus={handleFilterStatus}
              hoveredMarker={hoveredMarker}
            />
          )}
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allTrips = (await getNewestTrips()) || []
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
