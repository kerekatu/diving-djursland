import styles from './Trips.module.scss'
import PropTypes from 'prop-types'
import { formatDate } from '@/lib/date'
import cx from 'classnames'
import { trimWords } from '@/lib/trim'
import { faMap, faTimes } from '@fortawesome/free-solid-svg-icons'

import { Button } from '@/components/Button/Button'
import { categoryFormat } from '@/lib/categoryFormat'

const TripsList = ({
  items,
  filterItems,
  mapVisibility,
  filteredStatus,
  handleMapVisibility,
  handleFilterStatus
}) => {
  return (
    <div className={styles.trips_listing}>
      <div className={styles.trips_listing__top_container}>
        <div className={styles.trips_listing__top_left}>
          <span className={styles.trips_listing__amount}>
            {items.length} ture
          </span>
          <h3>Kommende Dykkerture – Djursland</h3>
        </div>
        <div className={styles.trips_listing__top_right}>
          {filteredStatus && (
            <Button
              icon={faTimes}
              type="secondary"
              title="Slet Filtrering"
              onClick={handleFilterStatus}
            />
          )}
          {!mapVisibility && (
            <Button
              icon={faMap}
              type="secondary"
              title="Map"
              onClick={handleMapVisibility}
            />
          )}
        </div>
      </div>
      <ul className={styles.trips_listing__list}>
        {items ? (
          items.map((trip, index) => (
            <li key={index} className={styles.trips_listing__item}>
              <div className={styles.trips_listing__img_container}>
                {trip?.trip_places[0] && (
                  <button
                    className={styles.trips_listing__difficulty}
                    onClick={() => filterItems(trip)}
                  >
                    <div
                      className={`dot dot_${categoryFormat(
                        trip.trip_places[0].trip_category
                      )}`}
                    ></div>
                    <p>{categoryFormat(trip.trip_places[0].trip_category)}</p>
                  </button>
                )}
                <img
                  src={
                    trip.trip_places[0].media[0]
                      ? 'http://localhost:1337' +
                        trip.trip_places[0].media[0]?.formats.small.url
                      : '/placeholder.png'
                  }
                  alt="Diving Trip Place"
                  className={styles.trips_listing__img}
                />
              </div>
              <div className={styles.trips_listing__content}>
                <p
                  className={cx(
                    styles.trips_listing__participants,
                    trip.participantsLeft < 4 && 'red_text'
                  )}
                >{`${trip.participantsLeft} pladser tilbage (ud af ${trip.participants})`}</p>
                <h4>{trip.title}</h4>
                <span className={styles.trips_listing__date}>
                  {formatDate(trip.date, 'EEEE d. MMMM, HH:mm')}
                </span>
                <p className={styles.trips_listing__desc}>
                  {trip.description && trimWords(trip.description, 20, 140)}
                </p>
                <div className={styles.trips_listing__checkout}>
                  <p
                    className={styles.trips_listing__price}
                  >{`${trip.priceDKK} DKK / ${trip.priceEUR} EUR`}</p>
                  <Button title="Tilmeld" type="primary" />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Ingen dykkertur er planlagt endnu, kom tilbage senere...</p>
        )}
      </ul>
    </div>
  )
}

TripsList.propTypes = {
  items: PropTypes.array.isRequired,
  filterItems: PropTypes.func.isRequired,
  mapVisibility: PropTypes.bool.isRequired,
  handleMapVisibility: PropTypes.func.isRequired,
  handleFilterStatus: PropTypes.func.isRequired,
  filteredStatus: PropTypes.bool.isRequired
}

export default TripsList
