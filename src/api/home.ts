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
