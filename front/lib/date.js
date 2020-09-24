import { format, getDate, getMonth, getYear } from 'date-fns'
import { da, enGB, de } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'PP', lang = 'da') => {
  return format(new Date(date), formatStr, {
    locale: lang === 'da' ? da : lang === 'en' ? enGB : de
  })
}

export const getFullDate = (date, reverse = false) => {
  const today = date
  const year = getYear(today)
  const month = `${getMonth(today) + 1}`.padStart(2, '0')
  const day = `${getDate(today)}`.padStart(2, '0')

  if (reverse) {
    return +[year, month, day].join('')
  } else {
    return +[day, month, year].join('')
  }
}

export const getFilteredDate = (date) => {
  return formatDate(date, 'YMMdd') > getFullDate(new Date(), true)
}
