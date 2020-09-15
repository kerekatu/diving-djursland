import { format, getDate, getMonth, getYear } from 'date-fns'
import { da, enGB, de } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'PP') => {
  const locales = { da, enGB, de }
  return format(new Date(date), formatStr, {
    locale: locales[global.__localeId__]
  })
}

export const getFullDate = (date) => {
  return getDate(date) + '' + (getMonth(date) + 1) + '' + getYear(date)
}
