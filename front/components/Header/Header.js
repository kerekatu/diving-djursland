import PropTypes from 'prop-types'
import styles from './Header.module.scss'
import useTranslation from 'next-translate/useTranslation'

import Navbar from '@/components/Navbar/Navbar'
import Logo from '@/components/Logo/Logo'
import { Button } from '@/components/Button/Button'

const Header = ({ isExtended }) => {
  const { t } = useTranslation()

  return (
    <header className={isExtended ? styles.header_extended : styles.header}>
      <div className={styles.header__content}>
        <Logo />
        <Navbar />
      </div>

      {isExtended && (
        <section className={styles.header__hero}>
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
        </section>
      )}
    </header>
  )
}

Header.propTypes = {
  isExtended: PropTypes.bool,
}

export default Header
