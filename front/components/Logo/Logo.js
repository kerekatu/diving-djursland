import styles from './Logo.module.scss'
import PropTypes from 'prop-types'
import Link from 'next-translate/Link'

const Logo = ({ variant }) => {
  return (
    <Link href="/">
      <a>
        <img
          className={styles.logo__img}
          src={!variant ? '/logo.svg' : '/logo-white.svg'}
          alt="Logo"
        />
        <img
          className={styles.logo__img_small}
          src={!variant ? '/logo-small.svg' : '/logo-small-white.svg'}
          alt="Logo"
        />
      </a>
    </Link>
  )
}

Logo.propTypes = {
  variant: PropTypes.bool
}

export default Logo
