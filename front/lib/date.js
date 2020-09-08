import { format } from 'date-fns'
import { da, enGB, de } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'PP') => {
  const locales = { da, enGB, de }
  return format(new Date(date), formatStr, {
    locale: locales[global.__localeId__]
  })
}
