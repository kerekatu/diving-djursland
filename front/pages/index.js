import styles from '@/styles/Home.module.scss'
import Card from '@/components/Card/Card'
import { trimWords } from '@/lib/trim'
import { getPopularData } from '@/lib/api'
import PropTypes from 'prop-types'
import Button from '@/components/Button/Button'

const HomePage = ({ popularPlaces }) => {
  return (
    <>
      <section className={styles.home_places}>
        <h2 className="center">Mest Populære Dykkersteder</h2>
        <div className={styles.home_places__container}>
          {popularPlaces
            .sort((a, b) => b.trips.length - a.trips.length)
            .slice(0, 3)
            .map((item, index) => (
              <Card type="highlight" key={index}>
                <img
                  src={
                    'http://localhost:1337' + item.media[0]?.formats.small.url
                  }
                  alt="Populær Dykkersted"
                  className={styles.home_places__img}
                />
                <div className={styles.home_places__content}>
                  <h5>{item.title}</h5>
                  <p className={styles.home_places__desc}>
                    {item.content && trimWords(item.content, 9, 100)}
                  </p>
                  <Button title="Læs mere" type="tertiary" />
                </div>
              </Card>
            ))}
        </div>
      </section>

      <section className={styles.home_trips}>
        <h2 className="center">Kommende Begivenheder</h2>
      </section>

      <section className={styles.home_newsletter}>
        <div className={styles.home_newsletter__content}>
          <h1>Nyhedsbrev</h1>
          <h4 className="white_text">
            Tilmeld dig nyhedsbrevet og få notifikationer direkte på din mail om
            alle nye begivenheder!
          </h4>
          <form action="" className={styles.home_newsletter__form}></form>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const popularPlaces = await getPopularData('trip-places')

  return {
    props: {
      popularPlaces,
    },
  }
}

HomePage.propTypes = {
  popularPlaces: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
}

export default HomePage
