import styles from '@/styles/Place.module.scss'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { getDataWithSlug, getAllData } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

import Layout from '@/components/Layout/Layout'
import { Slider, SliderItem } from '@/components/Slider/Slider'
import Loading from '@/components/Loading/Loading'

const Place = ({ post }) => {
  const router = useRouter()

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
          <h2>{post.title}</h2>
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
