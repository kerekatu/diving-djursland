import styles from './Footer.module.scss'
import PropTypes from 'prop-types'
import {
  faFacebookSquare,
  faInstagramSquare,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import useTranslation from 'next-translate/useTranslation'

import Logo from '@/components/Logo/Logo'
import Navbar from '@/components/Navbar/Navbar'

const Footer = ({ isExtended = false }) => {
  const { t } = useTranslation()

  return (
    <footer className={isExtended ? styles.footer_extended : styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer_top}>
          <div className={styles.footer_top__left}>
            <Logo variant />
            <div className={styles.footer__address}>
              <p>Svinget 2</p>
              <p>8570 Trustrup</p>
              <p>Lyngby</p>
              <br />
              <p>CVR: 40091149</p>
              <p>
                E-mail:&nbsp;
                <a
                  href="mailto:contact@scubafun.dk"
                  className={styles.footer__link}
                >
                  contact@scubafun.dk
                </a>
              </p>
              <p>
                Tlf.&nbsp;
                <a href="tel:+4542789605" className={styles.footer__link}>
                  +4542789605
                </a>
              </p>
            </div>
          </div>
          <div className={styles.footer_top__right}>
            <h3 className="black_text">{t('common:footer-social')}</h3>
            <div className={styles.footer__social}>
              <a
                href="https://www.facebook.com/ScubaFunDK/"
                target="_blank"
                rel="noreferrer"
                title="Facebook Fanpage"
              >
                <Icon icon={faFacebookSquare} className={styles.footer__icon} />
              </a>
              <a
                href="https://www.instagram.com/scubafundk/"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
              >
                <Icon
                  icon={faInstagramSquare}
                  className={styles.footer__icon}
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCspWLkThHe5d-Kdv2Tou8ww"
                target="_blank"
                rel="noreferrer"
                title="Youtube Channel"
              >
                <Icon icon={faYoutubeSquare} className={styles.footer__icon} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <div className={styles.footer__copyright}>
            {new Date().getFullYear()} &copy; Diving Djursland
          </div>
          <Navbar isFooter={true} />
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  isExtended: PropTypes.bool,
}

export default Footer
