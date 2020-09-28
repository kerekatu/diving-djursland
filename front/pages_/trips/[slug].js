import styles from '@/styles/Trip.module.scss'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'
import { useForm } from 'react-hook-form'
import { NextSeo } from 'next-seo'

import { getAllData, getDataWithSlug } from '@/lib/api'
import { formatDate } from '@/lib/date'
import categoryFormat from '@/lib/categoryFormat'

import { Slider, SliderItem } from '@/components/Slider/Slider'
import Layout from '@/components/Layout/Layout'
import { Form, FormInput, FormSelect } from '@/components/Form/Form'
import Loading from '@/components/Loading/Loading'
import { useState } from 'react'

const Trip = ({ tripData }) => {
  const trip = tripData && tripData[0]
  const selectOptions = ['Cash', 'Mobile Pay', 'Paypal', 'Webshop']

  const router = useRouter()
  const { t, lang } = useTranslation()
  const { handleSubmit, register, errors } = useForm()
  const [selectValue, setSelectValue] = useState(selectOptions[0])

  const onSubmit = (values) => {
    console.log(values)
    console.log(selectValue)
  }

  if (!router.isFallback && !trip?.slug) {
    return (
      <Layout>
        <Loading title="404 | Page Not Found" />
      </Layout>
    )
  }

  return (
    <>
      <NextSeo
        title={`Diving Djursland - ${trip.title}`}
        description="Har du taget certifikat for nylig og har brug for lidt mere erfaring er vores guidede ture lige noget for dig. Vi dykker forskellige destinationer alt efter vind og vejr så du har mulighed for at prøve lidt forskelligt. Er det længere tid siden du har dykket er det også en mulighed for en genopfriskning af dine dykkerfærdigheder eller bare."
      />
      <Layout>
        {router.isFallback ? (
          <Loading />
        ) : (
          <section className={styles.trip}>
            <div className={styles.trip__slider}>
              {trip?.trip_places[0].media[0] ? (
                <Slider showAmount>
                  {trip.trip_places[0]?.media.map((tripImg, index) => (
                    <SliderItem
                      item={'http://localhost:1337' + tripImg?.url}
                      key={index}
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  src="/placeholder.png"
                  alt="Placeholder"
                  className={styles.trip__slider_placeholder}
                />
              )}
            </div>
            <div className={styles.trip__info}>
              <h3 className="black_text">{trip.title}</h3>
              <div className={styles.trip__info_text}>
                <p>
                  <strong>{t('trips:trips-date')}: </strong>
                  {formatDate(trip.date, 'EEEE d. MMMM, HH:mm', lang)}
                </p>
              </div>
              <div className={styles.trip__info_text}>
                <strong>{t('trips:trips-address')}:</strong> {trip.address}
              </div>
              <div className={styles.trip__info_text}>
                <strong>{t('trips:trips-price')}:</strong>{' '}
                {lang === 'da'
                  ? `${trip.priceDKK} DKK`
                  : `${trip.priceEUR} EUR`}
              </div>
              <div className={styles.trip__info_text}>
                <strong>{t('trips:trips-participants-2')}: </strong>
                {trip.participantsLeft}
              </div>
              <div className={styles.trip__form}>
                <h3 className="center">{t('trips:trips-form-title')}</h3>
                <div className={styles.trip__form_notice}>
                  <strong>{t('trips:trips-notice-title')}</strong>
                  <p>{t('trips:trips-notice-1')}</p>
                  <p>{t('trips:trips-notice-2')}</p>
                </div>
                <Form
                  buttonTitle={t('trips:form-button-cta')}
                  acceptTerms
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={styles.trip__input_grid}>
                    <FormInput
                      label={t('trips:form-label-name')}
                      name="input_name"
                      placeholder="Joe Doe"
                      error={errors?.input_name}
                      register={register({
                        required: t('trips:form-required'),
                        minLength: 2,
                        maxLength: 30
                      })}
                    />
                    <FormInput
                      label={t('trips:form-label-phone')}
                      name="input_phone"
                      placeholder={t('trips:form-label-phone')}
                      error={errors?.input_phone}
                      register={register({
                        required: t('trips:form-required'),
                        minLength: 6,
                        maxLength: 30
                      })}
                    />
                  </div>
                  <FormInput
                    label={t('trips:form-label-email')}
                    name="input_email"
                    placeholder="example@example.com"
                    error={errors?.input_email}
                    register={register({
                      required: t('trips:form-required'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('trips:form-error-email')
                      }
                    })}
                  />
                  <div className={styles.trip__input_grid}>
                    <FormInput
                      label={t('trips:form-label-height')}
                      name="input_height"
                      placeholder={t('trips:form-label-height')}
                      error={errors?.input_height}
                      register={register({
                        required: t('trips:form-required'),
                        minLength: 3,
                        maxLength: 6
                      })}
                    />
                    <FormInput
                      label={t('trips:form-label-weight')}
                      name="input_weight"
                      placeholder={t('trips:form-label-weight')}
                      error={errors?.input_weight}
                      register={register({
                        required: t('trips:form-required'),
                        minLength: 2,
                        maxLength: 8
                      })}
                    />
                  </div>
                  <div className={styles.trip__input_grid}>
                    <FormInput
                      label={t('trips:form-label-shoe')}
                      name="input_shoe"
                      placeholder={t('trips:form-label-shoe')}
                      error={errors?.input_shoe}
                      register={register({
                        required: t('trips:form-required'),
                        minLength: 2,
                        maxLength: 4
                      })}
                    />
                    <FormSelect
                      label={t('trips:form-label-payment')}
                      name="input_payment"
                      options={selectOptions}
                      setSelectValue={setSelectValue}
                      selectValue={selectValue}
                    />
                  </div>
                </Form>
              </div>
            </div>
            <div className={styles.trip__desc}>
              <h4>{t('trips:trips-desc-title')}</h4>
              <p>{trip.description}</p>
              <p>
                <strong>{t('trips:trips-depth')}: </strong>
                {trip.trip_places[0]?.depth}m
              </p>
              <p>
                <strong>{t('trips:trips-difficulty')}: </strong>
                {categoryFormat(trip.trip_places[0]?.trip_category, t)}
              </p>
              <Link
                as={`/places/${trip.trip_places[0]?.slug}`}
                href="/places/[slug]"
              >
                <a className={styles.trip__link}>
                  {t('trips:trips-read-more')}
                </a>
              </Link>
            </div>
          </section>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ params }) {
  const tripData = (await getDataWithSlug('trips', params.slug)) || []

  return {
    props: {
      tripData
    }
  }
}

export async function getStaticPaths({ lang }) {
  const allTripsLinks = await getAllData('trips')

  return {
    paths:
      allTripsLinks.map((trip) => {
        if (lang === 'da') {
          return `/trips/${trip.slug}`
        } else {
          return `/${lang}/trips/${trip.slug}`
        }
      }) || [],
    fallback: true
  }
}

Trip.propTypes = {
  tripData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
}

export default Trip
