import { useState, useRef } from 'react'
import styles from './Button.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next-translate/Link'
import cx from 'classnames'
import useOnClickOutside from '@/hooks/useOnClickOutside'

export const Button = ({ title, type, icon, link, ...props }) => {
  if (link) {
    return (
      <Link href={link} {...props}>
        <a className={styles['btn_' + type]}>
          {title}
          {icon && (
            <Icon
              icon={icon}
              className={title ? styles.btn__icon_right : styles.btn__icon}
            />
          )}
        </a>
      </Link>
    )
  }

  return (
    <button className={styles['btn_' + type]} {...props}>
      {icon && (
        <Icon
          icon={icon}
          className={title ? styles.btn__icon_left : styles.btn__icon}
        />
      )}
      {title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.any,
  droppable: PropTypes.bool,
  link: PropTypes.string,
}

export const ButtonDropdown = ({
  defaultOption,
  options,
  setOption,
  navbar = false,
}) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)

  // const routerQuery = router.asPath.split('/').pop()

  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div className={styles.btn_dropdown_container} ref={ref}>
      <button
        className={cx(styles.btn_dropdown, open && styles.btn_dropdown_pressed)}
        onClick={() => setOpen(!open)}
      >
        {navbar
          ? options.map((option, index) => {
              if (defaultOption === option.slug) {
                return (
                  <img
                    src={option.icon}
                    alt="Language Icon"
                    className={styles.btn_dropdown__icon}
                    key={index}
                  />
                )
              }
            })
          : defaultOption?.icon && (
              <img
                src={defaultOption.icon}
                alt="Icon"
                className={styles.btn_dropdown__icon}
              />
            )}
        <Icon
          icon={open ? faAngleUp : faAngleDown}
          className={styles.btn__icon_right}
        />
      </button>
      {open && (
        <div className={styles.btn_dropdown__content}>
          {navbar
            ? options.map((option) =>
                option.slug === defaultOption ? null : (
                  <Link href="/" lang={option.slug} key={option.slug}>
                    <a className={styles.btn_dropdown__item}>
                      {option?.icon && (
                        <img
                          src={option.icon}
                          alt="Language Icon"
                          className={styles.btn_dropdown__icon}
                        />
                      )}
                      {option.title}
                    </a>
                  </Link>
                )
              )
            : options.map((option, index) =>
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
    PropTypes.array,
  ]).isRequired,
  options: PropTypes.array.isRequired,
  setOption: PropTypes.func.isRequired,
  navbar: PropTypes.bool,
}
