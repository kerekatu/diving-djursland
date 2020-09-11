import PropTypes from 'prop-types'
import styles from './Header.module.scss'

import Navbar from '@/components/Navbar/Navbar'
import Logo from '@/components/Logo/Logo'
import { Button } from '@/components/Button/Button'

const Header = ({ isExtended }) => {
  return (
    <header className={isExtended ? styles.header_extended : styles.header}>
      <div className={styles.header__content}>
        <Logo />
        <Navbar />
      </div>

      {isExtended && (
        <section className={styles.header__hero}>
          <h1>Deltag i Vores Spændende Dykkerture</h1>
          <p>
            Djursland rummer mange unikke naturoplevelser både over og under
            vandet. Er du certificeret dykker har du mulighed for at deltage i
            vores mange guidede ture på forskellige destinationer rund omkring
            Djursland.
          </p>
          <div className={styles.header__cta}>
            <Button
              type="_cta_primary"
              title="Se Kommende Dykkerture"
              link="/trips"
            />
            <Button type="_cta_secondary" title="Kontakt Os" link="/contact" />
          </div>
        </section>
      )}
    </header>
  )
}

Header.propTypes = {
  isExtended: PropTypes.bool
}

export default Header
