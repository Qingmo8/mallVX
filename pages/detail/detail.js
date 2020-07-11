// pages/detail/dateil.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idd: '',//首页点进去是获取的iid
    // topImages: [],
    topImages: {},
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    topPosition:0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.获取传入的iid
    // console.log(options)
    this.setData({
      iid: options.iid
    })
    //2.请求商品的具体数据
    this._getDetailData()

    //3.请求推荐数据
    this._getRecommends()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

        //j假
        scrollPosition(e) {
          //1.获取滚动到顶部
          // console.log(e)
          const position = e.detail.scrollTop;
          //2.设置是否显示
          this.setData({
            showBackTop: position > 1000,
          })
        //获取距离顶部的距离
          wx.createSelectorQuery().select('.tab-control').boundingClientRect((res) => {
            const show = rect.top >0
            this.setData({
              showTabControl: !show
            })
          }).exec()
        },
      

  
  //回到顶部
  onPageScroll(options) {
    //1.获取出scrollTop
    const scrollTop = options.scrollTop;
    // console.log(scrollTop)

    //2.修改showBackTop属性
    //不要在滚动的函数回调中频繁的调用this.setData
    const flag = scrollTop >= 1000;
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }

  },


  onAddCart() {
    //1.获取商品对象
    // console.log(this.data)
    const obj = {}
    obj.idd = this.data.idd;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    //2.加入到购物车列表
    app.addToCart(obj)

    //3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })

  },

  //-----------发送网络请求------
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      // console.log(res)
      const data = res.data.result
      // console.log(data)

      //1.取出顶部的图片
      const topImages = data.itemInfo.topImages;

      //2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      
      //3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)

      //4.获取detailInfo的信息
      const detailInfo = data.detailInfo

      //5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },

  _getRecommends() {
    getRecommends().then(res => {
      // console.log(res)
      this.setData({
        recommends: res.data.data.list
      })
    })
  }

})