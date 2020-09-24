import PropTypes from 'prop-types'
import Error from 'next/error'
import { useRouter } from 'next/router'

import { getDataWithSlug, getAllData } from '@/lib/api'

const Place = ({ placeData }) => {
  const router = useRouter()
  if (!router.isFallback && !placeData?.slug) {
    return <Error statusCode={404} />
  }

  return <div></div>
}

export async function getStaticProps({ params }) {
  const placeData = (await getDataWithSlug('trip-places', params.slug)) || []

  return {
    props: {
      placeData
    }
  }
}

export async function getStaticPaths() {
  const allTripsLinks = await getAllData('trip-places')

  return {
    paths: allTripsLinks.map((trip) => `/places/${trip.slug}`) || [],
    fallback: true
  }
}

Place.propTypes = {
  placeData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
}

export default Place
