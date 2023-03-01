import axios from 'axios'
import i18n from '../lang'
import { useValidateStore } from '@/stores'
import isBase64 from 'is-base64'
import { isJSON } from '../utils/utils'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // api的base_url
  timeout: 80000, // request timeout
})

// 请求拦截器
service.interceptors.request.use((config : {[key: string]: any}) => {
  let lang = i18n.global.locale.value
  if (lang) {
    let o: {[key: string]: string} = {
      'zh-cn': 'cn',
      'zh-tw': 'cn',
      en: 'en'
    }
    config.headers.lang = o[lang] ?? ''
  }
  if (config.url.startsWith('/v1api/')) {
    config.headers['X-Auth'] = localStorage.ave_token || ''
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    const data = response.data
    if (data?.status <= 0) {
      let msg = data?.msg || ''
      let status = 'errorCode.' + String(data?.status)
      if (i18n.global.te(status)) {
        msg = i18n.global.t(status)
      }
      console.log('error', data?.msg || '')
      return Promise.reject(msg)
    }
    if (data?.data_type === 1 && typeof(data?.data) === 'string' && data?.data) {
      if (isJSON(data?.data)) {
        return JSON.parse(data?.data)
      } else {
        return data?.data
      }
    }
    if ((data?.data_type === 2  || data?.data_type === 3) && data?.encode_data && typeof(data?.encode_data) === 'string' && isBase64(data?.encode_data)) {
      return JSON.parse(window.decodeURIComponent(window.atob(data?.encode_data).replace(/\+/g, ' ')))
    }
    if (typeof(data) === 'string' && isBase64(data)) {
      return JSON.parse(window.decodeURIComponent(window.atob(data).replace(/\+/g, ' ')))
    }
    if (data?.status === 1) {
      return data.data
    }
    return data
  },
  error => {
    if (error.response && error.response.status) {
      if (error.response.status === 403) {
        let validateStore = useValidateStore()
        if (!validateStore.validateDialogVisible) {
          validateStore.validateDialogVisible = true
          console.log("validateStore.validateDialogVisibl",validateStore.validateDialogVisible)
        }
      }
    }
    return Promise.reject(error?.message || error)
  }
)

export default service
