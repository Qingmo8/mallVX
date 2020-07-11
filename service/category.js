import request from './network'

const baseUrl = 'http://123.207.32.32:8000'

export function getCategory() {
  return request({
    url: baseUrl + '/api/m3/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url:baseUrl + '/api/m3/subcategory',
    data: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url:baseUrl + '/api/m3/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}