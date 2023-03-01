import { createI18n } from 'vue-i18n'
import enLocale from './en.json'
import zhLocale from './zh-cn.json'
import { getLocale } from '../utils/utils'

const language = localStorage.language || getLocale()

const i18n = createI18n({
  locale: language,
  fallbackLocale: "en",
  globalInjection: true,
  messages: {
    en: enLocale,
    "zh-cn": zhLocale,
  },
});
export default i18n
