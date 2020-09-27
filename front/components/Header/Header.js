import PropTypes from 'prop-types'
import styles from './Header.module.scss'
import useTranslation from 'next-translate/useTranslation'
import cx from 'classnames'
import { motion } from 'framer-motion'

import Navbar from '@/components/Navbar/Navbar'
import Logo from '@/components/Logo/Logo'
import { Button } from '@/components/Button/Button'

const Header = ({ isExtended, containedWidth, variant }) => {
  const { t } = useTranslation()

  return (
    <header
      className={
        isExtended
          ? styles.header_extended
          : cx(styles.header, variant && styles.header_white)
      }
    >
      <div
        className={
          containedWidth
            ? cx(styles.header__content, styles.header__content_contained)
            : styles.header__content
        }
      >
        <Logo variant={variant} />
        <Navbar />
      </div>

      {isExtended && (
        <motion.section
          className={styles.header__hero}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.8, ease: [0.175, 0.85, 0.42, 0.96] },
          }}
        >
          <h1>{t('common:header-hero-h1')}</h1>
          <p>{t('common:header-hero-p')}</p>
          <div className={styles.header__cta}>
            <Button
              type="_cta_primary"
              title={t('common:header-hero-cta-1')}
              link="/trips"
            />
            <Button
              type="_cta_secondary"
              title={t('common:header-hero-cta-2')}
              link="/contact"
            />
          </div>
        </motion.section>
      )}
    </header>
  )
}

Header.propTypes = {
  isExtended: PropTypes.bool,
  containedWidth: PropTypes.bool,
  variant: PropTypes.bool,
}

export default Header
