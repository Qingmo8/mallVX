// pages/home/home.js
import {
getMultiData,
getProduct
} from '../../service/home'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      // [POP]: { page: 1, list: [] },
      // [NEW]: { page: 1, list: [] },
      // [SELL]: { page: 1, list: [] },
      
      pop: { page: 1, list: [] },
      new: { page: 1, list: [] },
      sell: { page: 1, list: [] },
    },
    currentType: 'pop',
    topPosition:0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.请求轮播图以及推荐的数据
    this._getData()
   
  },
  loadMore() {
    this._getProductData(this.data.currentType);
    // console.log(this.data.currentType)
  },


  //--------点击事件监听---------
  onImageLoad() {
    
    //获取距离顶部的距离
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      // console.log(rect)
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
  },

  tabClick(e) {
    // console.log(e)
    //取出index
    const index = e.detail.index;
    // console.log(index)
    //1.根据当前的点击赋值最新的CurrentType
    let currentType = ''
    switch (index) {
      case 0:
        currentType = 'pop'
        break
      case 1:
        currentType = 'new'
        break
      case 2:
        currentType = 'sell'
        break
    
    }
    // console.log(currentType)
    this.setData({
      currentType: currentType
    })
    // console.log(currentType)
    // console.log(this.selectComponent('.tab-control'));
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },

  onBackTop() {
    // wx.pageScrollTo({
    //   duration: 0,
    //   scrollTop:0
    // }),

    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop:0
    })
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
      // console.log(res)
      // const show = rect.top >0
      const show = res.top > 0
      this.setData({
        showTabControl: !show
      })
    }).exec()
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
    //上拉滚动到底部，重新请求新的数据
    this._getProductData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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


  //----------------网络请求相关----------
  _getData(){
    this._getMultidata(); 
    this._getProductData('pop');
    this._getProductData('new');
    this._getProductData('sell')


  },
  _getMultidata(){
    getMultiData().then(res => {
      // console.log(res)
      //取出数据
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      //将数据存入data中
      this.setData({
        banners,
        recommends
      })
    }).catch(err => {
      console.log(err)
    })
  },
  _getProductData(type) {
    // //1.获取数据对应的页码数
    // getProduct('pop', 1).then(res => {
    //   console.log(res)
    // })
    const page = this.data.goods[type].page;
    //2.请求对应的数据
    getProduct(type, page).then(res => {
      // console.log(res)
      //1.取出数据
      // const list = res.data.list;
      const list = res.data.data.list;
      //2.将数据临时获取
      const goods = this.data.goods;
        //将数据一 一存取
      goods[type].list.push(...list);
      goods[type].page += 1


      //3.存储到最新的goods中
      this.setData({
        goods:goods
      })
    })
  }
})


