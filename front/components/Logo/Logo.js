import styles from './Logo.module.scss'
import PropTypes from 'prop-types'

const Logo = ({ variant }) => {
  return (
    <img
      className={styles.logo__img}
      src={!variant ? 'logo.svg' : 'logo-white.png'}
      alt="Logo"
    />
  )
}

Logo.propTypes = {
  variant: PropTypes.bool,
}

export default Logo
