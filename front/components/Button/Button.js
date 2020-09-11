import { useState, useRef } from 'react'
import styles from './Button.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import cx from 'classnames'
import useOnClickOutside from '@/hooks/useOnClickOutside'

export const Button = ({ title, type, icon, link }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={styles['btn_' + type]}>
          {icon} {title}
        </a>
      </Link>
    )
  }

  return <button className={styles['btn_' + type]}>{title}</button>
}

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.any,
  droppable: PropTypes.bool,
  link: PropTypes.string
}

export const ButtonDropdown = ({ defaultOption, options, setOption }) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className={styles.btn_dropdown_container} ref={ref}>
      <button
        className={cx(styles.btn_dropdown, open && styles.btn_dropdown_pressed)}
        onClick={() => setOpen(!open)}
      >
        {defaultOption?.icon && (
          <img
            src={defaultOption.icon}
            alt="Language Icon"
            className={styles.btn_dropdown__icon}
          />
        )}
        <Icon
          icon={open ? faAngleUp : faAngleDown}
          className={styles.btn__icon}
        />
      </button>
      {open && (
        <div className={styles.btn_dropdown__content}>
          {options.map((option, index) =>
            option.title === defaultOption.title ? null : (
              <button
                className={styles.btn_dropdown__item}
                key={index}
                onClick={() => setOption({ ...options, option })}
              >
                {option?.icon && (
                  <img
                    src={option.icon}
                    alt="Language Icon"
                    className={styles.btn_dropdown__icon}
                  />
                )}
                {option.title}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

ButtonDropdown.propTypes = {
  defaultOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  options: PropTypes.array.isRequired,
  setOption: PropTypes.func.isRequired
}
