import styles from './Trips.module.scss'
import PropTypes from 'prop-types'
import { formatDate } from '@/lib/date'
import cx from 'classnames'
import { trimWords } from '@/lib/trim'
import { faMap, faTimes } from '@fortawesome/free-solid-svg-icons'
import useTranslation from 'next-translate/useTranslation'

import { Button } from '@/components/Button/Button'
import categoryFormat from '@/lib/categoryFormat'

const TripsList = ({
  items,
  filterItems,
  mapVisibility,
  filteredStatus,
  handleMapVisibility,
  handleFilterStatus,
  hoverMarkerWithTrip
}) => {
  const { t, lang } = useTranslation()

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
      <ul
        className={
          mapVisibility
            ? styles.trips_listing__list
            : styles.trips_listing__list_full
        }
      >
        {items ? (
          items.map((trip, index) => (
            <li
              key={index}
              className={styles.trips_listing__item}
              onMouseOver={() =>
                hoverMarkerWithTrip(trip.trip_places[0].map_marker)
              }
              onMouseOut={() => hoverMarkerWithTrip()}
            >
              <div className={styles.trips_listing__img_container}>
                {trip.trip_places[0].trip_category && (
                  <button
                    className={styles.trips_listing__difficulty}
                    onClick={() => filterItems(trip)}
                  >
                    <div
                      className={`dot dot_${trip.trip_places[0].trip_category}`}
                    ></div>
                    <p>
                      {categoryFormat(trip.trip_places[0].trip_category, t)}
                    </p>
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
                  loading="lazy"
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
                <h4>{trimWords(trip.title, 10, 40)}</h4>
                <span className={styles.trips_listing__date}>
                  {formatDate(trip.date, 'EEEE d. MMMM, HH:mm', lang)}
                </span>
                {/* <p className={styles.trips_listing__desc}>
                  {trip.description && trimWords(trip.description, 30, 180)}
                </p> */}
                <div className={styles.trips_listing__checkout}>
                  <Button
                    title={
                      lang === 'da'
                        ? `${t('common:trip-book-cta')} (${trip.priceDKK} DKK)`
                        : `${t('common:trip-book-cta')} (${trip.priceEUR} EUR)`
                    }
                    as={`/trips/${trip.slug}`}
                    link="/trips/[slug]"
                    type="primary"
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.trips_listing__notification}>
            Ingen dykkertur er planlagt endnu, kom tilbage senere...
          </p>
        )}
        <p className={styles.trips_listing__notification}>
          Flere dykkerture kommer snart...
        </p>
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
  filteredStatus: PropTypes.bool.isRequired,
  hoverMarkerWithTrip: PropTypes.func.isRequired
}

export default TripsList
