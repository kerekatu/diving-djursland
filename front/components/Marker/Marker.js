import { useState, useRef, useEffect } from 'react'
import styles from './Marker.module.scss'
import cx from 'classnames'
import PropTypes from 'prop-types'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { trimWords } from '@/lib/trim'
import Link from 'next-translate/Link'

const Marker = ({
  category,
  placeInfo,
  handleFindTrips,
  handleFilterStatus,
  filteredStatus,
  hoveredMarker,
  markerId
}) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  useOnClickOutside(ref, () => {
    if (filteredStatus) {
      setOpen(false)
    } else if (open && !filteredStatus) {
      setOpen(false)
      handleFilterStatus()
    }
  })

  useEffect(() => {
    if (hoveredMarker === markerId) {
      setHovered(true)
    } else {
      setHovered(false)
    }
  }, [hoveredMarker])

  return (
    <div className={styles.marker_container} ref={ref}>
      <button
        className={cx(
          styles.marker,
          styles['marker_' + category],
          open && styles.marker_pressed,
          hovered && styles.marker_pressed
        )}
        onClick={() => {
          if (!open && !filteredStatus) {
            setOpen(true)
            handleFindTrips(placeInfo.title)
          } else if (!open && filteredStatus) {
            setOpen(true)
          } else {
            setOpen(false)
            handleFilterStatus()
          }
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
  category: PropTypes.number.isRequired,
  placeInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  handleFindTrips: PropTypes.func.isRequired,
  handleFilterStatus: PropTypes.func.isRequired,
  filteredStatus: PropTypes.bool.isRequired,
  hoveredMarker: PropTypes.number.isRequired,
  markerId: PropTypes.number.isRequired
}

export default Marker
