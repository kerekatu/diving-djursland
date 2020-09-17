import styles from '@/styles/Home.module.scss'
import Card from '@/components/Card/Card'
import { trimWords } from '@/lib/trim'
import { getPopularData, getNewestTrips } from '@/lib/api'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/lib/date'

import { Button } from '@/components/Button/Button'
import Layout from '@/components/Layout/Layout'
import { Form, FormInput } from '@/components/Form/Form'

const HomePage = ({ popularPlaces, newestTrips }) => {
  const { t, lang } = useTranslation()

  return (
    <Layout extendedHeader={true}>
      <section className={styles.home_places}>
        <h2 className="center">{t('home:heading-section-places')}</h2>
        <div className={styles.home_places__container}>
          {popularPlaces
            .sort((a, b) => b.trips.length - a.trips.length)
            .slice(0, 3)
            .map((item, index) => (
              <Card type="primary" key={index}>
                <img
                  src={
                    item.media[0]
                      ? 'http://localhost:1337' +
                        item.media[0]?.formats.small.url
                      : '/placeholder.png'
                  }
                  loading="lazy"
                  alt="Populær Dykkersted"
                  className={styles.home_places__img}
                />
                <div className={styles.home_places__content}>
                  <h5>{item.title}</h5>
                  <p className={styles.home_places__desc}>
                    {item.content && trimWords(item.content, 30, 140)}
                  </p>
                  <Button
                    title={t('home:section-places-cta')}
                    type="tertiary"
                    link={`/places/${item.slug}`}
                  />
                </div>
              </Card>
            ))}
        </div>
      </section>

      <section className={styles.home_trips}>
        <h2 className="center">{t('home:heading-section-trips')}</h2>
        <div className={styles.home_trips__container}>
          {newestTrips.slice(0, 4).map((trip, index) => {
            return index === 0 ? (
              <Card type="highlight" key={index}>
                <img
                  src={
                    trip.trip_places[0].media[0]
                      ? 'http://localhost:1337' +
                        trip.trip_places[0].media[0]?.formats.medium.url
                      : '/placeholder.png'
                  }
                  alt="Ny Dykkertur"
                  className={styles.home_trips__img_highlight}
                />
                <div className={styles.home_trips__content}>
                  <div className={styles.home_trips__content_left}>
                    <h4>{trimWords(trip.title, 10, 40)}</h4>
                    <p className={styles.home_trips__desc}>
                      {trip.description && trimWords(trip.description, 24, 200)}
                    </p>
                  </div>
                  <div className={styles.home_trips__content_right}>
                    <p className={styles.home_trips__date}>
                      {formatDate(trip.date, 'd/M/yy HH:mm', lang)}
                    </p>
                    <Button
                      title={
                        lang === 'da'
                          ? `Tilmeld (${trip.priceDKK} DKK)`
                          : `Reserve (${trip.priceEUR} EUR)`
                      }
                      as={`/trips/${trip.slug}`}
                      link="/trips/[slug]"
                      type="primary"
                    />
                  </div>
                </div>
              </Card>
            ) : (
              <Card type="secondary" key={index}>
                <div className={styles.home_trips__content}>
                  <div className={styles.home_trips__content_left}>
                    <h4>{trimWords(trip.title, 10, 40)}</h4>
                    <p className={styles.home_trips__desc}>
                      {trip.description && trimWords(trip.description, 20, 110)}
                    </p>
                  </div>
                  <div className={styles.home_trips__content_right}>
                    <p className={styles.home_trips__date}>
                      {formatDate(trip.date, 'd/M/yy HH:mm', lang)}
                    </p>
                    <Button
                      title={
                        lang === 'da'
                          ? `Tilmeld (${trip.priceDKK} DKK)`
                          : `Reserve (${trip.priceEUR} EUR)`
                      }
                      type="primary"
                    />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
        <Button
          title={t('home:section-trips-cta')}
          type="_cta_tertiary"
          link="/trips"
          icon={faAngleRight}
        />
      </section>

      <section className={styles.home_newsletter}>
        <div className={styles.home_newsletter__content}>
          <h1>{t('home:heading-section-newsletter')}</h1>
          <h4 className="white_text">
            {t('home:heading-section-newsletter-2')}
          </h4>
          <Form
            customClass={styles.home_newsletter__form}
            buttonTitle={t('home:newsletter-form-cta')}
          >
            <FormInput
              name="input-name"
              label={t('home:newsletter-form-label')}
              placeholder="Joe Doe"
            />
            <FormInput
              name="input-email"
              type="email"
              label={t('home:newsletter-form-label-2')}
              placeholder="example@example.com"
              required
            />
          </Form>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const popularPlaces = (await getPopularData('trip-places')) || []
  const newestTrips = (await getNewestTrips()) || []

  return {
    props: {
      popularPlaces,
      newestTrips
    }
  }
}

HomePage.propTypes = {
  popularPlaces: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  newestTrips: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired
}

export default HomePage
