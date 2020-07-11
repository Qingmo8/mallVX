export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail:reject
    })
  })
}


// // 页面加载中的提示
// function request(options) {
//   wx.showLoading({
//     title: '数据加载中ing',
//   })
// }



// export default request;