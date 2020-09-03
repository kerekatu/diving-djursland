import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.scss'

import Button from '../Button/Button'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          <Link href="/">
            <a className={styles.navbar__link}>Forside</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/trips">
            <a className={styles.navbar__link}>Dykkerture</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/info">
            <a className={styles.navbar__link}>Praktisk Info</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/contact">
            <a className={styles.navbar__link}>Kontakt</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Button type="secondary" title="dk" droppable={true} />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
