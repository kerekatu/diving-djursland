import styles from './Trips.module.scss'
import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'
import Marker from '../Marker/Marker'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TripsMap = ({
  markers,
  handleMapVisibility,
  handleFindTrips,
  handleFilterStatus
}) => {
  return (
    <div className={styles.trips_map}>
      <button
        className={styles.trips_map__btn}
        onClick={() => handleMapVisibility()}
      >
        <Icon icon={faTimes} className={styles.trips_map__icon} />
      </button>
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
            handleFindTrips={handleFindTrips}
            handleFilterStatus={handleFilterStatus}
            key={marker.id}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

TripsMap.propTypes = {
  markers: PropTypes.array,
  handleMapVisibility: PropTypes.func,
  handleFindTrips: PropTypes.func
}

export default TripsMap
