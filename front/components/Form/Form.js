import styles from './Form.module.scss'
import PropTypes from 'prop-types'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'

import { Button } from '@/components/Button/Button'

export const Form = ({
  children,
  customClass,
  buttonTitle,
  acceptTerms = false,
}) => {
  const { t } = useTranslation()

  return (
    <form action="" className={customClass ?? styles.form}>
      {children}
      {acceptTerms && (
        <p>
          {t('common:accept-terms')}{' '}
          <Link href="/privacy">
            <a className={styles.form__link}>{t('common:accept-terms-link')}</a>
          </Link>
          .
        </p>
      )}
      <Button title={buttonTitle} type="primary" />
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
  buttonTitle: PropTypes.string,
  acceptTerms: PropTypes.bool,
}

export const FormInput = ({ label, name, type = 'text', ...props }) => {
  return (
    <div className={styles.form__input_container}>
      <label htmlFor={name} className={styles.form__label}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          size="10"
          type="text"
          id={name}
          name={name}
          className={styles.form__input}
          {...props}
        />
      ) : (
        <input
          size="10"
          type={type}
          id={name}
          name={name}
          className={styles.form__input}
          {...props}
        />
      )}
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
}
