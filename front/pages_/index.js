import styles from '@/styles/Home.module.scss'
import Card from '@/components/Card/Card'
import { trimWords } from '@/lib/trim'
import { getPopularData } from '@/lib/api'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'

import { Button } from '@/components/Button/Button'
import Layout from '@/components/Layout/Layout'

const HomePage = ({ popularPlaces }) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <section className={styles.home_places}>
        <h2 className="center">{t('home:heading-section-places')}</h2>
        <div className={styles.home_places__container}>
          {popularPlaces
            .sort((a, b) => b.trips.length - a.trips.length)
            .slice(0, 3)
            .map((item, index) => (
              <Card type="highlight" key={index}>
                <img
                  src={
                    item.media[0]
                      ? 'http://localhost:1337' +
                        item.media[0]?.formats.small.url
                      : '/placeholder.png'
                  }
                  alt="Populær Dykkersted"
                  className={styles.home_places__img}
                />
                <div className={styles.home_places__content}>
                  <h5>{item.title}</h5>
                  <p className={styles.home_places__desc}>
                    {item.content && trimWords(item.content, 9, 100)}
                  </p>
                  <Button
                    title="Læs mere"
                    type="tertiary"
                    link={`/places/${item.slug}`}
                  />
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
    </Layout>
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
