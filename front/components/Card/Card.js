import styles from './Card.module.scss'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Card = ({ children, type }) => {
  return (
    <div className={cx(styles.card, styles['card_' + type])}>{children}</div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
}

export default Card
