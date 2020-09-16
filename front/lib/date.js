import { format, getDate, getMonth, getYear } from 'date-fns'
import { da, enGB, de } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'PP', lang) => {
  return format(new Date(date), formatStr, {
    locale: lang === 'da' ? da : lang === 'en' ? enGB : de,
  })
}

export const getFullDate = (date) => {
  return getDate(date) + '' + (getMonth(date) + 1) + '' + getYear(date)
}
