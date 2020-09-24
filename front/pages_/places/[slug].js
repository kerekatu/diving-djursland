import styles from '@/styles/Place.module.scss'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { getDataWithSlug, getAllData } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

import Layout from '@/components/Layout/Layout'
import { Slider, SliderItem } from '@/components/Slider/Slider'
import Loading from '@/components/Loading/Loading'
import { Button } from '@/components/Button/Button'
import useTranslation from 'next-translate/useTranslation'

const Place = ({ post }) => {
  const router = useRouter()
  const { t } = useTranslation()

  if (!router.isFallback && !post?.slug) {
    return (
      <Layout>
        <Loading title="404 | Page Not Found" />
      </Layout>
    )
  }

  return (
    <Layout>
      {router.isFallback ? (
        <Loading />
      ) : (
        <section className={styles.place}>
          <div className={styles.place_top}>
            <Button
              type="secondary"
              icon={faArrowLeft}
              onClick={() => router.push('/trips')}
            />
            <h2>{post.title}</h2>
          </div>
          {post.media[0] && (
            <div className={styles.place__slider}>
              <Slider showAmount>
                {post?.media.map((placeImg, index) => (
                  <SliderItem
                    item={'http://localhost:1337' + placeImg?.url}
                    key={index}
                  />
                ))}
              </Slider>
            </div>
          )}
          <div className={styles.place__content}>
            <div className={styles.place__info}>
              <p>
                <strong>{t('common:trip-address')}:</strong> {post.address}
              </p>
              <p>
                <strong>{t('common:trip-depth')}:</strong> {post.depth} m
              </p>
              <p>
                <strong>{t('common:trip-difficulty')}:</strong>{' '}
                {post.trip_category.category}
              </p>
              <p>
                <strong>GPS: </strong>
                <a
                  href={`https://www.google.com/maps/@${post.map_marker.lat},${post.map_marker.lng},18z`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {post.map_marker.lat}, {post.map_marker.lng}
                </a>
              </p>
            </div>
            <div
              className={styles.place__markdown}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            <iframe
              id="ytplayer"
              type="text/html"
              src={post.youtube_video}
              frameBorder="0"
              className={styles.place__video}
            />
          </div>
        </section>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const placeData = (await getDataWithSlug('trip-places', params.slug)) || []
  const content = await markdownToHtml(placeData[0]?.content || '')

  return {
    props: {
      post: {
        ...placeData[0],
        content
      }
    }
  }
}

export async function getStaticPaths() {
  const allDataLinks = await getAllData('trip-places', '')

  return {
    paths: allDataLinks.map((trip) => `/places/${trip.slug}`) || [],
    fallback: true
  }
}

Place.propTypes = {
  post: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
}

export default Place
