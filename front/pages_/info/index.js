import styles from '@/styles/Info.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { NextSeo } from 'next-seo'

import Layout from '@/components/Layout/Layout'
import { Faq } from '@/components/Faq/Faq'
import { Button } from '@/components/Button/Button'

const InfoPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={'Diving Djursland - Praktisk Info'}
        description="Har du taget certifikat for nylig og har brug for lidt mere erfaring er vores guidede ture lige noget for dig. Vi dykker forskellige destinationer alt efter vind og vejr så du har mulighed for at prøve lidt forskelligt. Er det længere tid siden du har dykket er det også en mulighed for en genopfriskning af dine dykkerfærdigheder eller bare."
      />
      <Layout variantWhite={true} containedWidth={false}>
        <div className={styles.info_title}>
          <h2>{t('info:info-title')}</h2>
          <p>{t('info:info-subtitle')}</p>
        </div>
        <section className={styles.info}>
          <div className={styles.info_container}>
            <Faq items={t('info:questions', {}, { returnObjects: true })} />
            <div className={styles.info__bottom}>
              <span>{t('info:info-bottom-text')}</span>
              <Button
                type="secondary"
                title={t('info:info-bottom-btn')}
                link="/contact"
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default InfoPage
