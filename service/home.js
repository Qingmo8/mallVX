import request from './network.js'
const baseUrl = 'http://123.207.32.32:8000'

export function getMultiData() {
  return request ({
    url: baseUrl + '/api/m3/home/multidata'
  })
}

export function  getProduct(type, page) {
  return request({
    url:baseUrl + '/api/m3/home/data',
    data: {
      type,
      page
    }
  })
}