import styles from './Footer.module.scss'
import Navbar from '../Navbar/Navbar'
import PropTypes from 'prop-types'
import Logo from '../Logo/Logo'
import {
  faFacebookSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Footer = ({ isExtended = false }) => {
  return (
    <footer className={isExtended ? styles.footer_extended : styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer_top}>
          <div className={styles.footer_top__left}>
            <Logo />
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
            <h3 className="black_text">Find os</h3>
            <div className={styles.footer__social}>
              <a href="https://facebook.com/">
                <Icon icon={faFacebookSquare} className={styles.footer__icon} />
                <Icon
                  icon={faInstagramSquare}
                  className={styles.footer__icon}
                />
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
