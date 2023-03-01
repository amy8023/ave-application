import request from './request'

// get Captcha
export function getCaptcha() {
  return request({
    method: 'get',
    url: `/v1api/v1/captcha/getCaptcha`
  })
}

// verify Captcha
export function verifyCaptcha(id: string, value: string) {
  return request({
    method: 'post',
    url: `/v1api/v1/captcha/verifyCaptcha`,
    data: {
      id: id,
      value: value
    }
  })
}
