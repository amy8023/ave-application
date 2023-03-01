import { defineStore } from 'pinia'

export const useValidateStore = defineStore('validate', {
  state: () => {
    return {
      validateDialogVisible: false,
      aToken: '',
      routeKey: 0
    }
  },
  actions: {
    switchValidateDialogVisible(visible: boolean) {
      this.validateDialogVisible = visible
    },
    setAToken(val: string) {
      this.aToken = val
      localStorage.ave_token = val
    }
  }
})
