import styles from '@/styles/Home.module.scss'
import Card from '@/components/Card/Card'
import { getPopularData } from '@/lib/api'
import PropTypes from 'prop-types'

const HomePage = ({ popularPlaces }) => {
  console.log(popularPlaces)
  return (
    <section className={styles.home_places}>
      <h2 className="center">Mest Populære Dykkersteder</h2>
      <Card type="highlight"></Card>
    </section>
  )
}

export async function getStaticProps() {
  const popularPlaces = await getPopularData('trip-places')

  return {
    props: {
      popularPlaces
    }
  }
}

HomePage.propTypes = {
  popularPlaces: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired
}

export default HomePage
