import styles from './Form.module.scss'
import PropTypes from 'prop-types'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

import { Button } from '@/components/Button/Button'

export const Form = ({
  children,
  customClass,
  buttonTitle,
  acceptTerms = false,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <form action="" className={customClass ?? styles.form} {...props}>
      {children}
      {acceptTerms && (
        <p className={styles.form__terms}>
          {t('common:accept-terms')}{' '}
          <Link href="/privacy">
            <a className={styles.form__link}>{t('common:accept-terms-link')}</a>
          </Link>
          .
        </p>
      )}
      <Button buttonType="submit" title={buttonTitle} type="primary" />
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
  buttonTitle: PropTypes.string,
  acceptTerms: PropTypes.bool,
}

export const FormInput = ({
  label,
  name,
  type = 'text',
  register,
  error,
  ...props
}) => {
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
          className={cx(styles.form__input, error && styles.form__input_error)}
          {...props}
          ref={register}
        />
      ) : (
        <input
          size="10"
          type={type}
          id={name}
          name={name}
          className={cx(styles.form__input, error && styles.form__input_error)}
          {...props}
          ref={register}
        />
      )}
      {error && <span className={styles.form__error}>{error.message}</span>}
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.any,
  error: PropTypes.any,
}

export const FormSelect = ({
  label,
  name,
  options,
  setSelectValue,
  selectValue,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.form__input_container}>
      <label
        htmlFor={name}
        className={styles.form__label}
        onClick={() => setOpen(true)}
      >
        {label}
      </label>
      <div
        label={name}
        name={name}
        className={cx(styles.form__select, open && styles.form__select_open)}
        onClick={() => setOpen(!open)}
        {...props}
      >
        <div
          className={cx(
            styles.form__select_placeholder,
            selectValue && styles.form__select_placeholder_selected
          )}
        >
          <span>{selectValue}</span>
          <Icon icon={faChevronDown} />
        </div>

        {open && (
          <div className={styles.form__select_dropdown}>
            <ul className={styles.form__select_list}>
              {options.map((option, index) => (
                <li
                  className={cx(
                    styles.form__select_item,
                    option === selectValue && styles.form__select_item_selected
                  )}
                  onClick={() => {
                    setOpen(false)
                    setSelectValue(option)
                  }}
                  key={index}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setSelectValue: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
}
