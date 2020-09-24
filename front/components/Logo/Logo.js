import styles from './Logo.module.scss'
import PropTypes from 'prop-types'

const Logo = ({ variant }) => {
  return <div className={variant ? styles.logo_blue : styles.logo}>Logo</div>
}

Logo.propTypes = {
  variant: PropTypes.bool
}

export default Logo
