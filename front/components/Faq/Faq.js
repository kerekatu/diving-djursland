import styles from './Faq.module.scss'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export const Faq = ({ items }) => {
  const [itemOpen, setItemOpen] = useState(null)

  const handleClickItem = (index) => {
    if (index === itemOpen) {
      setItemOpen(null)
    } else {
      setItemOpen(index)
    }
  }

  return (
    <div className={styles.faq}>
      <ul className={styles.faq__list}>
        {items.map((item, index) => (
          <li className={styles.faq__item} key={index}>
            <button
              className={styles.faq__btn}
              onClick={() => handleClickItem(index)}
            >
              <p>{item.title}</p>
              <Icon
                icon={itemOpen === index ? faChevronUp : faChevronDown}
                className={styles.faq__icon}
              ></Icon>
            </button>

            {itemOpen === index && (
              <div className={styles.faq__item_content}>
                <p className={styles.faq__text}>{item.question}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

Faq.propTypes = {
  items: PropTypes.array.isRequired,
}
