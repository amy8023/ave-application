import { defineStore } from 'pinia'
import { getLocale } from '../utils/utils'

export const useLanguageStore = defineStore('language', {
  state: () => {
    return {
      language: localStorage.language || getLocale(),
    }
  },
  actions: {
    setLanguage(language: string) {
      this.language = language
      localStorage.language = language
    }
  },
})
