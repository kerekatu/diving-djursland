import { useContext, useState } from 'react'
import { I18nContext } from 'next-i18next'
import Link from 'next/link'
import styles from './Navbar.module.scss'

import { ButtonDropdown } from '@/components/Button/Button'

const Navbar = () => {
  const [language, setLanguage] = useState([
    { title: 'Dansk', icon: '/dk-flag.svg' },
    { title: 'English', icon: '/gb-flag.svg' }
  ])
  // const {
  //   i18n: { language }
  // } = useContext(I18nContext)

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
          <ButtonDropdown
            defaultOption={language[0]}
            options={language}
            setOption={setLanguage}
          />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
