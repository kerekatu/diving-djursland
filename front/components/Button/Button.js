import styles from './Button.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Button = ({ title, type, icon, droppable, link }) => {
  if (link) {
    return (
      <Link href={link}>
        <a>
          <button className={styles['btn_' + type]}>
            {title}
            {droppable && (
              <Icon icon={faAngleDown} className={styles.btn__icon} />
            )}
          </button>
        </a>
      </Link>
    )
  }

  return (
    <button className={styles['btn_' + type]}>
      {title}
      {droppable && <Icon icon={faAngleDown} className={styles.btn__icon} />}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.any,
  droppable: PropTypes.bool,
  link: PropTypes.string,
}

export default Button
