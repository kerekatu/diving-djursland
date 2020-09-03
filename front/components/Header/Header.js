import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.module.scss'

import Navbar from '../Navbar/Navbar'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'

const Header = ({ type }) => {
  return (
    <header
      className={type === 'extended' ? styles.header_extended : styles.header}
    >
      <div className={styles.header__content}>
        <Logo />
        <Navbar />
      </div>
      <section className={styles.header__hero}>
        <h1>Deltag i Vores Spændende Dykkerture</h1>
        <p>
          Djursland rummer mange unikke naturoplevelser både over og under
          vandet. Er du certificeret dykker har du mulighed for at deltage i
          vores mange guidede ture på forskellige destinationer rund omkring
          Djursland.
        </p>
        <div className={styles.header__cta}>
          <Button type="_cta_primary" title="Se Kommende Dykkerture" />
          <Button type="_cta_secondary" title="Kontakt Os" />
        </div>
      </section>
    </header>
  )
}

Header.propTypes = {
  type: PropTypes.string
}

export default Header
