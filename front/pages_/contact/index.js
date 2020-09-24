import Layout from '@/components/Layout/Layout'
import styles from '@/styles/Contact.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { Form, FormInput } from '@/components/Form/Form'

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <Layout extendedFooter={true}>
      <section className={styles.contact}>
        <div className={styles.contact__map_container}>
          <iframe
            frameBorder="0"
            src="https://www.google.com/maps/embed/v1/place?q=svinget 2,+trustrup,+Danmark&key=AIzaSyB85S0mo9-AHfVm3-KhI_sVbwN_BdELGU4"
            allowFullScreen
            className={styles.contact__map}
          ></iframe>
          <div className={styles.contact__info}>
            <h3 className="white_text">{t('contact:heading')}</h3>
            <div className={styles.contact__info_text}>
              <p>Svinget 2</p>
              <p>8570 Trustrup</p>
              <p>Lyngby</p>
              <br />
              <p>CVR: 40091149</p>
              <p>
                E-mail:&nbsp;
                <a
                  href="mailto:contact@scubafun.dk"
                  className={styles.contact__link}
                >
                  contact@scubafun.dk
                </a>
              </p>
              <p>
                Tlf.&nbsp;
                <a href="tel:+4542789605" className={styles.contact__link}>
                  +4542789605
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contact__form}>
          <h2>{t('contact:heading-form')}</h2>
          <p>{t('contact:text-form')}</p>
          <Form buttonTitle="Send" acceptTerms>
            <FormInput label="Navn" name="input-name" minLength="3" required />
            <FormInput
              label="E-mail"
              type="email"
              name="input-email"
              required
            />
            <FormInput label="Emne" name="input-title" required />
            <FormInput
              label="Besked"
              type="textarea"
              name="input-text"
              minLength="20"
              required
            />
          </Form>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage
