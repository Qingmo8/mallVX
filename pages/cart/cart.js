// pages/cart/cart.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    isSelectAll:true,
    totalPrice: 0,
    totalCounter: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      cartList:app.globalData.cartList
    })
    //2.设置回调
    app.addCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }
    //3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      //1.修改某一项的选中状态
      console.log(index)
      this.setData({
        ['cartList[${index}]']: goods
      })
      // 2.修改全部的选中状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    wx.setNavigationBarTitle({
      title:'购物车(${this.data.carList.length})',
    })
    this.changeData()

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


  onSelectAll() {
    //1.判断是否是全部选中
    if (this.data.isSelectAll) {//现在全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    }else {//某些没有选中的
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
  },
  changeData() {
    //1.获取所有选中的数据
    let totalPrice = 0;
    let counter = 0;
    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price*item.count
      }
    }
    console.log(counter, totalPrice)
    //2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})