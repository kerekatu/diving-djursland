import styles from '@/styles/Privacy.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { NextSeo } from 'next-seo'

import Layout from '@/components/Layout/Layout'

const PrivacyPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <NextSeo
        title={'Diving Djursland - Privatlivspolitik'}
        description="Har du taget certifikat for nylig og har brug for lidt mere erfaring er vores guidede ture lige noget for dig. Vi dykker forskellige destinationer alt efter vind og vejr så du har mulighed for at prøve lidt forskelligt. Er det længere tid siden du har dykket er det også en mulighed for en genopfriskning af dine dykkerfærdigheder eller bare."
      />
      <Layout>
        <section className={styles.privacy}>
          <div className={styles.privacy_container}>
            <h2>{t('privacy:privacy-title')}</h2>
            <p>{t('privacy:privacy-content')}</p>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default PrivacyPage
