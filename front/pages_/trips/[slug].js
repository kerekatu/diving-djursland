import styles from '@/styles/Trip.module.scss'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { getAllData, getDataWithSlug } from '@/lib/api'

import { Slider, SliderItem } from '@/components/Slider/Slider'
import Layout from '@/components/Layout/Layout'

const Trip = ({ tripData }) => {
  const trip = tripData[0]
  const router = useRouter()

  return (
    <Layout>
      <section className={styles.trip}>
        <div className={styles.trip__slider}>
          {trip.trip_places[0].media[0] ? (
            <Slider showAmount>
              {trip.trip_places[0].media.map((tripImg, index) => (
                <SliderItem
                  item={'http://localhost:1337' + tripImg.formats.large.url}
                  key={index}
                />
              ))}
            </Slider>
          ) : (
            <img
              src="/placeholder.png"
              alt="Placeholder"
              className={styles.trip__slider_placeholder}
            />
          )}
        </div>
        <div className={styles.trip__info}>
          <h3 className="black_text">{trip.title}</h3>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const tripData = (await getDataWithSlug('trips', params.slug)) || []

  return {
    props: {
      tripData,
    },
  }
}

export async function getStaticPaths() {
  const allTripsLinks = await getAllData('trips')

  return {
    paths: allTripsLinks.map((trip) => `/trips/${trip.slug}`) || [],
    fallback: true,
  }
}

Trip.propTypes = {
  tripData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
}

export default Trip
