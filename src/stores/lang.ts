import { defineStore } from 'pinia'
import Cookies from "js-cookie";
export const useLanguageStore = defineStore("language", {
  state: () => {
    return {
      language: Cookies.get("language") || "en",
    };
  },
  actions: {
    setLanguage(language: string) {
      this.language = language;
      Cookies.set("language", language);
    },
  },
});
