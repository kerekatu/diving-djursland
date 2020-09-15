import { useState } from 'react'
import Link from 'next-translate/Link'
import styles from './Navbar.module.scss'

import { ButtonDropdown } from '@/components/Button/Button'
import useTranslation from 'next-translate/useTranslation'

const Navbar = () => {
  const [language, setLanguage] = useState([
    { title: 'Dansk', slug: 'da', icon: '/dk-flag.svg' },
    { title: 'English', slug: 'en', icon: '/gb-flag.svg' },
  ])
  const { t, lang } = useTranslation()

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          <Link href="/">
            <a className={styles.navbar__link}>{t('common:navbar-link-1')}</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/trips">
            <a className={styles.navbar__link}>{t('common:navbar-link-2')}</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/info">
            <a className={styles.navbar__link}>{t('common:navbar-link-3')}</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link href="/contact">
            <a className={styles.navbar__link}>{t('common:navbar-link-4')}</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <ButtonDropdown
            defaultOption={lang}
            options={language}
            setOption={setLanguage}
            navbar={true}
          />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
