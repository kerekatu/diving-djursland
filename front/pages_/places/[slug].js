import styles from '@/styles/Place.module.scss'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'
import { NextSeo } from 'next-seo'

import { getDataWithSlug, getAllData } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { formatDate } from '@/lib/date'

import Layout from '@/components/Layout/Layout'
import { Slider, SliderItem } from '@/components/Slider/Slider'
import Loading from '@/components/Loading/Loading'
import { Button } from '@/components/Button/Button'

const Place = ({ post }) => {
  const router = useRouter()
  const { t, lang } = useTranslation()

  if (!router.isFallback && !post?.slug) {
    return (
      <Layout>
        <Loading title="404 | Page Not Found" />
      </Layout>
    )
  }

  return (
    <>
      <NextSeo
        title={`Diving Djursland - ${post.title}`}
        description="Har du taget certifikat for nylig og har brug for lidt mere erfaring er vores guidede ture lige noget for dig. Vi dykker forskellige destinationer alt efter vind og vejr så du har mulighed for at prøve lidt forskelligt. Er det længere tid siden du har dykket er det også en mulighed for en genopfriskning af dine dykkerfærdigheder eller bare."
      />
      <Layout>
        {router.isFallback ? (
          <Loading />
        ) : (
          <section className={styles.place}>
            <div className={styles.place_top}>
              <Button
                type="secondary"
                icon={faArrowLeft}
                onClick={() => router.back()}
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
                  <strong>{t('common:place-address')}:</strong> {post.address}
                </p>
                <p>
                  <strong>{t('common:place-depth')}:</strong> {post.depth} m
                </p>
                <p>
                  <strong>{t('common:place-difficulty')}:</strong>{' '}
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
              {post?.youtube_video && (
                <iframe
                  id="ytplayer"
                  type="text/html"
                  src={post.youtube_video}
                  frameBorder="0"
                  className={styles.place__video}
                />
              )}
              {post?.trips.length > 0 && (
                <ul className={styles.place_trips}>
                  <p className={styles.place_trips__title}>
                    {t('common:place-heading-more')} {post.title}
                  </p>
                  {post.trips.map((trip, index) => (
                    <Link
                      as={`/trips/${trip.slug}`}
                      href="/trips/[slug]"
                      key={index}
                    >
                      <a>
                        <li className={styles.place_trips__item}>
                          <p>{trip.title}</p>
                          <span>
                            {formatDate(trip.date, 'EEEE d. MMMM, HH:mm', lang)}
                          </span>
                        </li>
                      </a>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const placeData = (await getDataWithSlug('trip-places', params.slug)) || []
  const content = await markdownToHtml(placeData[0]?.content || '')

  return {
    props: {
      post: {
        ...placeData[0],
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const allDataLinks = await getAllData('trip-places', '')

  return {
    paths: allDataLinks.map((trip) => `/places/${trip.slug}`) || [],
    fallback: true,
  }
}

Place.propTypes = {
  post: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
}

export default Place
