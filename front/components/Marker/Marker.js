import { useState, useRef } from 'react'
import styles from './Marker.module.scss'
import cx from 'classnames'
import PropTypes from 'prop-types'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { trimWords } from '@/lib/trim'
import Link from 'next/link'

const Marker = ({
  category,
  placeInfo,
  handleFindTrips,
  handleFilterStatus
}) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)

  useOnClickOutside(ref, () => {
    setOpen(false)
    handleFilterStatus()
  })

  return (
    <div className={styles.marker_container} ref={ref}>
      <button
        className={cx(
          styles.marker,
          styles['marker_' + category],
          open && styles.marker_pressed
        )}
        onClick={() => {
          setOpen(!open)
          handleFindTrips(placeInfo.title)
        }}
      ></button>
      {open && (
        <Link as={`/places/${placeInfo.slug}`} href="/places/[slug]">
          <a>
            <div className={styles.marker_dropdown}>
              <img
                src={
                  placeInfo.media[0]
                    ? 'http://localhost:1337' +
                      placeInfo.media[0]?.formats.small.url
                    : '/placeholder.png'
                }
                alt="Place Thumbnail"
                className={styles.marker_dropdown__img}
              />
              <div className={styles.marker_dropdown__content}>
                <div className={styles.marker_dropdown__title}>
                  {placeInfo?.title}
                </div>
                <p className={styles.marker_dropdown__desc}>
                  {placeInfo.content &&
                    trimWords(
                      placeInfo.content.replace(/[^\w\s]/gi, ''),
                      6,
                      30
                    )}
                </p>
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  )
}

Marker.propTypes = {
  category: PropTypes.string,
  placeInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
}

export default Marker
