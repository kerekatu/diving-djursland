import styles from '@/styles/Home.module.scss'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { trimWords } from '@/lib/trim'
import { getPopularData, getNewestTrips } from '@/lib/api'
import { formatDate } from '@/lib/date'

import Card from '@/components/Card/Card'
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
            .map((item, index) => {
              const description =
                item.content && trimWords(item.content, 30, 140)
              const img = item.media[0]
                ? `http://localhost:1337${item.media[0]?.formats.small.url}`
                : '/placeholder.png'

              return (
                <Card type="primary" key={index}>
                  <img
                    src={img}
                    loading="lazy"
                    alt="Populær Dykkersted"
                    className={styles.home_places__img}
                  />
                  <div className={styles.home_places__content}>
                    <h5>{item.title}</h5>
                    <p className={styles.home_places__desc}>{description}</p>
                    <Button
                      title={t('home:section-places-cta')}
                      type="tertiary"
                      link={`/places/${item.slug}`}
                    />
                  </div>
                </Card>
              )
            })}
        </div>
      </section>

      <section className={styles.home_trips}>
        <h2 className="center">{t('home:heading-section-trips')}</h2>
        <div className={styles.home_trips__container}>
          {newestTrips.slice(0, 4).map((trip, index) => {
            const title = trip.title && trimWords(trip.title, 10, 40)
            const description =
              trip.description && trimWords(trip.description, 16, 100)
            const img = trip.trip_places[0].media[0]
              ? `http://localhost:1337'${trip.trip_places[0].media[0]?.formats.medium.url}`
              : '/placeholder.png'
            const date = formatDate(trip.date, 'd/M/yy HH:mm', lang)
            const btnTitle =
              lang === 'da'
                ? `${t('common:trip-book-cta')} (${trip.priceDKK} DKK)`
                : `${t('common:trip-book-cta')} (${trip.priceEUR} EUR)`

            return index === 0 ? (
              <Card type="highlight" key={index}>
                <img
                  src={img}
                  alt="Ny Dykkertur"
                  className={styles.home_trips__img_highlight}
                />
                <div className={styles.home_trips__content}>
                  <div className={styles.home_trips__content_left}>
                    <h4>{title}</h4>
                    <p className={styles.home_trips__desc}>{description}</p>
                  </div>
                  <div className={styles.home_trips__content_right}>
                    <p className={styles.home_trips__date}>{date}</p>
                    <Button
                      title={btnTitle}
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
                    <h4>{title}</h4>
                    <p className={styles.home_trips__desc}>{description}</p>
                  </div>
                  <div className={styles.home_trips__content_right}>
                    <p className={styles.home_trips__date}>{date}</p>
                    <Button title={btnTitle} type="primary" />
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
      newestTrips,
    },
  }
}

HomePage.propTypes = {
  popularPlaces: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  newestTrips: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
}

export default HomePage
