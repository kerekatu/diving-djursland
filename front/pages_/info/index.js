import styles from '@/styles/Info.module.scss'
import useTranslation from 'next-translate/useTranslation'

import Layout from '@/components/Layout/Layout'
import { Faq } from '@/components/Faq/Faq'
import { Button } from '@/components/Button/Button'

const InfoPage = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <section className={styles.info}>
        <h2>{t('info:info-title')}</h2>
        <p>{t('info:info-subtitle')}</p>
        <Faq items={t('info:questions', {}, { returnObjects: true })} />
        <div className={styles.info__bottom}>
          <span>{t('info:info-bottom-text')}</span>
          <Button
            type="secondary"
            title={t('info:info-bottom-btn')}
            link="/contact"
          />
        </div>
      </section>
    </Layout>
  )
}

export default InfoPage
