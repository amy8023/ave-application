import request from './request'

// updateIcon
export function applyToken(data: any) {
  return request({
    method: "post",
    url: "/v1api/v3/tokens/manager/submit",
    headers: { "Content-Type": "multipart/form-data" },
    data: data,
  });
}
export function getSingleApplyToken(id: string) {
  return request({
    method: "get",
    url: "/v1api/v3/tokens/manager/submition",
    params: {
      id: id,
    }
  })
}
// get chain config
export function getChainList() {
  return request({
    method: 'get',
    url: '/v1api/v3/tokens/manager/chains'
  })
}

// submit logo
export function submitLogo(data: Object) {
  return request({
    method: 'post',
    url: '/v1api/v3/tokens/manager/submit_logo',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
export function getContractCheckResult(tokenId: string) {
  return request({
    method: 'get',
    url: '/v1api/v2/tokens/contract',
    params: {
      token_id: tokenId,
      type: 'token',
      user_address: '',
    }
  })
}
// get token info
export function getMainToken(id:string) {
  let newId = id
  return request({
    method: 'get',
    url: `/v1api/v3/tokens/${newId}`
  })
}
export function getTokenExtraDetail(id:string) {
  let newId = id
  return request({
    method: "get",
    url: `/v1api/v2/tokens/${newId}/extraDetail`,
  });
}