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
  const selectOptions = ['Kontant', 'Mobile Pay', 'Paypal', 'Webshop']

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
                  <strong>Dato: </strong>
                  {formatDate(trip.date, 'EEEE d. MMMM, HH:mm', lang)}
                </p>
              </div>
              <div className={styles.trip__info_text}>
                <strong>Adresse:</strong> {trip.address}
              </div>
              <div className={styles.trip__info_text}>
                <strong>Pris per person:</strong> {trip.priceDKK} DKK
              </div>
              <div className={styles.trip__info_text}>
                <strong>Antal ledige pladser:</strong> {trip.participantsLeft}
              </div>
              <div className={styles.trip__form}>
                <h3 className="center">Tilmeldingsformular</h3>
                <div className={styles.trip__form_notice}>
                  <strong>Vigtig Info!</strong>
                  <p>1. Du skal være en certificeret dykker for at deltage</p>
                  <p>
                    2. Din tilmelding er først bekræftet, når du har betalt
                    (hold øje med dit email for instruktioner)
                  </p>
                </div>
                <Form
                  buttonTitle="Tilmeld"
                  acceptTerms
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={styles.trip__input_grid}>
                    <FormInput
                      label="Navn"
                      name="input_name"
                      placeholder="Joe Doe"
                      error={errors?.input_name}
                      register={register({
                        required: 'Feltet er obligatorisk',
                        minLength: 2,
                        maxLength: 30,
                      })}
                    />
                    <FormInput
                      label="Tlf."
                      name="input_phone"
                      placeholder="Telefonnummer"
                      error={errors?.input_phone}
                      register={register({
                        required: 'Feltet er obligatorisk',
                        minLength: 6,
                        maxLength: 30,
                      })}
                    />
                  </div>
                  <FormInput
                    label="Email-adresse"
                    name="input_email"
                    placeholder="example@example.com"
                    error={errors?.input_email}
                    register={register({
                      required: 'Feltet er obligatorisk',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Ugyldig email-adresse',
                      },
                    })}
                  />
                  <div className={styles.trip__input_grid}>
                    <FormInput
                      label="Højde"
                      name="input_height"
                      placeholder="Højde"
                      error={errors?.input_height}
                      register={register({
                        required: 'Feltet er obligatorisk',
                        minLength: 3,
                        maxLength: 6,
                      })}
                    />
                    <FormInput
                      label="Vægt"
                      name="input_weight"
                      placeholder="Vægt"
                      error={errors?.input_weight}
                      register={register({
                        required: 'Feltet er obligatorisk',
                        minLength: 2,
                        maxLength: 8,
                      })}
                    />
                  </div>
                  <div className={styles.trip__input_grid}>
                    <FormInput
                      label="Skostørrelse"
                      name="input_shoe"
                      placeholder="Skostørrelse"
                      error={errors?.input_shoe}
                      register={register({
                        required: 'Feltet er obligatorisk',
                        minLength: 2,
                        maxLength: 4,
                      })}
                    />
                    <FormSelect
                      label="Betalingsmetode"
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
              <h4>Beskrivelse</h4>
              <p>{trip.description}</p>
              <p>
                <strong>Dybde: </strong>
                {trip.trip_places[0]?.depth}m
              </p>
              <p>
                <strong>Sværhedgrad: </strong>
                {categoryFormat(trip.trip_places[0]?.trip_category, t)}
              </p>
              <Link
                as={`/places/${trip.trip_places[0]?.slug}`}
                href="/places/[slug]"
              >
                <a className={styles.trip__link}>Læs mere om dykkerstedet...</a>
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
      tripData,
    },
  }
}

export async function getStaticPaths() {
  const allTripsLinks = await getAllData('trips')

  return {
    paths: allTripsLinks.map((trip) => `/trips/${trip.slug}`) || [],
    fallback: true,
  }
}

Trip.propTypes = {
  tripData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
}

export default Trip
