import styles from './Trips.module.scss'
import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'
import Marker from '../Marker/Marker'

const TripsMap = ({ markers }) => {
  console.log(markers)

  return (
    <div className={styles.trips_map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API }}
        defaultCenter={[56.406654, 10.797895]}
        defaultZoom={9.5}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers.map((marker) => (
          <Marker
            lat={marker.lat}
            lng={marker.lng}
            placeInfo={marker.trip_place}
            category={marker.trip_category.category.toLowerCase()}
            key={marker.id}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

TripsMap.propTypes = {
  markers: PropTypes.array
}

export default TripsMap
