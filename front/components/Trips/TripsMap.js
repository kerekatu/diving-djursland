import styles from './Trips.module.scss'
import GoogleMapReact from 'google-map-react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Marker from '@/components/Marker/Marker'

const TripsMap = ({
  markers,
  handleMapVisibility,
  handleFindTrips,
  handleFilterStatus,
  filteredStatus,
  hoveredMarker
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
        {markers &&
          markers.map((marker) => (
            <Marker
              lat={marker.lat}
              lng={marker.lng}
              filteredStatus={filteredStatus}
              placeInfo={marker.trip_place}
              category={marker.trip_place.trip_category}
              markerId={marker.id}
              handleFindTrips={handleFindTrips}
              handleFilterStatus={handleFilterStatus}
              hoveredMarker={hoveredMarker}
              key={marker.id}
            />
          ))}
      </GoogleMapReact>
    </div>
  )
}

TripsMap.propTypes = {
  markers: PropTypes.array.isRequired,
  handleMapVisibility: PropTypes.func.isRequired,
  handleFindTrips: PropTypes.func.isRequired,
  handleFilterStatus: PropTypes.func.isRequired,
  filteredStatus: PropTypes.bool.isRequired,
  hoveredMarker: PropTypes.number
}

export default TripsMap
