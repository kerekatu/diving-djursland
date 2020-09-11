import styles from './Trips.module.scss'
import PropTypes from 'prop-types'
import { formatDate } from '@/lib/date'
import cx from 'classnames'
import { trimWords } from '@/lib/trim'

import { Button } from '@/components/Button/Button'

const TripsList = ({ items }) => {
  console.log(items)
  return (
    <div className={styles.trips_listing}>
      <span className={styles.trips_listing__amount}>{items.length} ture</span>
      <h3>Kommende Dykkerture – Djursland</h3>
      <ul className={styles.trips_listing__list}>
        {items.map((trip, index) => (
          <li key={index} className={styles.trips_listing__item}>
            <div className={styles.trips_listing__img_container}>
              {trip?.trip_category && (
                <button className={styles.trips_listing__difficulty}>
                  <div
                    className={`dot dot__${trip.trip_category.category.toLowerCase()}`}
                  ></div>
                  <p>{trip.trip_category.category}</p>
                </button>
              )}
              <img
                src={
                  'http://localhost:1337' +
                  trip.trip_places[0].media[0]?.formats.small.url
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
                {trimWords(trip.description, 20, 140)}
              </p>
              <div className={styles.trips_listing__checkout}>
                <p
                  className={styles.trips_listing__price}
                >{`${trip.priceDKK} DKK / ${trip.priceEUR} EUR`}</p>
                <Button title="Tilmeld" type="primary" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

TripsList.propTypes = {
  items: PropTypes.array.isRequired
}

export default TripsList
