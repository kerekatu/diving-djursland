import { useState } from 'react'
import Link from 'next-translate/Link'
import styles from './Navbar.module.scss'
import cx from 'classnames'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import { ButtonDropdown, Button } from '@/components/Button/Button'
import useTranslation from 'next-translate/useTranslation'

const Navbar = ({ isFooter = false }) => {
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState([
    { title: 'Dansk', slug: 'da', icon: '/dk-flag.svg' },
    { title: 'English', slug: 'en', icon: '/gb-flag.svg' }
  ])
  const router = useRouter()

  const { t, lang } = useTranslation()

  if (!isFooter) {
    return (
      <>
        <nav className={styles.navbar}>
          <ul className={styles.navbar__list}>
            <li className={styles.navbar__item}>
              <Link href="/">
                <a className={styles.navbar__link}>
                  {t('common:navbar-link-1')}
                </a>
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link href="/trips">
                <a className={styles.navbar__link}>
                  {t('common:navbar-link-2')}
                </a>
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link href="/info">
                <a className={styles.navbar__link}>
                  {t('common:navbar-link-3')}
                </a>
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link href="/contact">
                <a className={styles.navbar__link}>
                  {t('common:navbar-link-4')}
                </a>
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
        <nav className={styles.navbar_hamburger}>
          <Button
            type="dropdown"
            icon={faBars}
            onClick={() => setOpen(!open)}
          ></Button>
          <ButtonDropdown
            defaultOption={lang}
            options={language}
            setOption={setLanguage}
            navbar={true}
          />
          {open && (
            <div className={styles.navbar_hamburger__content}>
              <ul className={styles.navbar__list}>
                <li className={styles.navbar__item}>
                  <Link href="/">
                    <a className={styles.navbar__link}>
                      {t('common:navbar-link-1')}
                    </a>
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <Link href="/trips">
                    <a className={styles.navbar__link}>
                      {t('common:navbar-link-2')}
                    </a>
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <Link href="/info">
                    <a className={styles.navbar__link}>
                      {t('common:navbar-link-3')}
                    </a>
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <Link href="/contact">
                    <a className={styles.navbar__link}>
                      {t('common:navbar-link-4')}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </>
    )
  } else {
    return (
      <nav className={cx(styles.navbar, styles.navbar_footer)}>
        <ul className={styles.navbar__list}>
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
            <Link href="/equipment">
              <a className={styles.navbar__link}>{t('common:navbar-link-6')}</a>
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link href="/privacy">
              <a className={styles.navbar__link}>{t('common:navbar-link-5')}</a>
            </Link>
          </li>
          <li className={styles.navbar__item}>
            <Link href={router.pathname}>
              <a className={styles.navbar__link}>
                <Icon icon={faArrowUp}></Icon>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
