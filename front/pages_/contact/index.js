import styles from '@/styles/Contact.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form'
import { NextSeo } from 'next-seo'

import { Form, FormInput } from '@/components/Form/Form'
import Layout from '@/components/Layout/Layout'

const ContactPage = () => {
  const { t } = useTranslation()
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <>
      <NextSeo
        title={'Diving Djursland - Kontakt'}
        description="Har du taget certifikat for nylig og har brug for lidt mere erfaring er vores guidede ture lige noget for dig. Vi dykker forskellige destinationer alt efter vind og vejr så du har mulighed for at prøve lidt forskelligt. Er det længere tid siden du har dykket er det også en mulighed for en genopfriskning af dine dykkerfærdigheder eller bare."
      />
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
            <Form
              buttonTitle="Send"
              acceptTerms
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormInput
                label={t('contact:form-label-name')}
                name="input_name"
                placeholder="Joe Doe"
                minLength="2"
                maxLength="40"
              />
              <FormInput
                label={t('contact:form-label-email')}
                type="email"
                name="input_email"
                placeholder="example@example.com"
                register={register({
                  required: t('contact:form-required'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('contact:form-error-email')
                  }
                })}
                error={errors?.input_email}
              />
              <FormInput
                label={t('contact:form-label-topic')}
                name="input_topic"
                placeholder={t('contact:form-label-topic')}
                register={register({
                  required: t('contact:form-required'),
                  minLength: 2,
                  maxLength: 100
                })}
                error={errors?.input_topic}
              />
              <FormInput
                label={t('contact:form-label-message')}
                type="textarea"
                name="input_message"
                placeholder={t('contact:form-label-message')}
                register={register({
                  required: t('contact:form-required'),
                  minLength: 3,
                  maxLength: 1000
                })}
                error={errors?.input_message}
              />
            </Form>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default ContactPage
