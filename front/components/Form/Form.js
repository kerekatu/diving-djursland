import styles from './Form.module.scss'
import PropTypes from 'prop-types'

import { Button } from '@/components/Button/Button'

export const Form = ({ children, customClass, buttonTitle }) => {
  return (
    <form action="" className={customClass ?? styles.form}>
      {children}
      <Button title={buttonTitle} type="primary" />
    </form>
  )
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
  buttonTitle: PropTypes.string,
}

export const FormInput = ({ label, name, type = 'text', ...props }) => {
  return (
    <div className={styles.form__input_container}>
      <label htmlFor={name} className={styles.form__label}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={styles.form__input}
        {...props}
      />
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
}
