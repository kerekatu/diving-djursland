import { useState, useEffect } from 'react'
import styles from './Slider.module.scss'
import PropTypes from 'prop-types'
import {
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'

import { Button } from '@/components/Button/Button'

export const Slider = ({
  children,
  showAmount = false,
  autoPlay = false,
  autoPlaySpeed = 5000
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (currentSlide > children.length - 2) {
          setCurrentSlide(0)
        } else {
          setCurrentSlide((currentSlide) => currentSlide + 1)
        }
      }, autoPlaySpeed)

      return () => clearInterval(interval)
    }
  }, [currentSlide, autoPlay])

  const changeSliderItem = (current) => {
    if (current < 0 || current >= children.length) {
      return
    }

    setCurrentSlide(current)
  }

  return (
    <div className={styles.slider}>
      {showAmount && (
        <div className={styles.slider__amount}>{`${currentSlide + 1} / ${
          children.length
        }`}</div>
      )}
      {children[currentSlide]}
      {children.length > 1 && (
        <>
          <Button
            type="icon"
            icon={faChevronLeft}
            onClick={() =>
              changeSliderItem(
                currentSlide === 0 ? children.length - 1 : currentSlide - 1
              )
            }
          ></Button>
          <Button
            type="icon"
            icon={faChevronRight}
            onClick={() =>
              changeSliderItem(
                currentSlide === children.length - 1 ? 0 : currentSlide + 1
              )
            }
          ></Button>
        </>
      )}
    </div>
  )
}

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  showAmount: PropTypes.bool,
  autoPlay: PropTypes.bool,
  autoPlaySpeed: PropTypes.number
}

export const SliderItem = ({ item }) => {
  return (
    <div className={styles.slider__item}>
      <img src={item} alt="Slide" className={styles.slider__img} />
    </div>
  )
}

SliderItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}
