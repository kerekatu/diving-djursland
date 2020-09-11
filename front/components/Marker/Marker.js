import { useState, useRef } from 'react'
import styles from './Marker.module.scss'
import cx from 'classnames'
import PropTypes from 'prop-types'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Marker = ({ category, placeInfo }) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className={styles.marker_container} ref={ref}>
      <button
        className={cx(
          styles.marker,
          styles['marker_' + category],
          open && styles.marker_pressed
        )}
        onClick={() => setOpen(!open)}
      ></button>
      {open && (
        <a href="/about">
          <div className={styles.marker_dropdown}>
            <button
              className={styles.marker_dropdown__btn_close}
              onClick={() => setOpen(false)}
            >
              <Icon icon={faTimes} className={styles.marker_dropdown__icon} />
            </button>
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
                {placeInfo.title}
              </div>
            </div>
          </div>
        </a>
      )}
    </div>
  )
}

Marker.propTypes = {
  category: PropTypes.string,
  placeInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
}

export default Marker
