import { useRouter } from 'next/router'
import { getAllData } from '@/lib/api'

const Trip = () => {
  return <div></div>
}

export async function getStaticPaths() {
  const allPlacesLinks = await getAllData('trip-places')

  return {
    paths: allPlacesLinks.map((place) => `/places/${place.slug}`) || [],
    fallback: true
  }
}

export default Trip
