// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求分类数据
    this._getCategory()
    

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

  //--------点击触发事件
  menuClick(e) {
    //1.改变当前的currentIndex
    // console.log(e)
    const currentIndex = e.detail.currentIndex;
    // console.log(currentIndex)
    this.setData({
      currentIndex
    })
    //2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);
    //3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  },

    
  //---------发送网络请求数据函数------
  _getCategory() {
    getCategory().then(res => {
      // console.log(res)
      //1.获取categories
      const categories = res.data.data.category.list;
      //2.初始化每个类别的子数据
      const categoryData = {};
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
          // categoryDetail: {
          //   'pop':[],
          //   'new':[],
          //   'sell':[]
          // }
        }       
      }
      //3.修改data中的数据
      this.setData({
        categories:res.data.data.category.list,
        categoryData:categoryData
      })
      //4.请求第一个类别的数据
      this._getSubcategory(0)

      //请求第一个类别的详情数据
      this._getCategoryDetail(0)

    })
  },
  _getSubcategory(currentIndex) {
    //1.获取对应的maitkey
    // console.log(this.data)
    const maitkey = this.data.categories[currentIndex].maitKey;
    //2.请求数据
    getSubcategory(maitkey).then(res => {
      const tempCategoryData = this.data.categoryData;
      // console.log(res)
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      // console.log(tempCategoryData[currentIndex].subcategories)
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    //1.获取对应的miniWallkey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;
    //2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      //1.获取categoryData
      const categoryData = this.data.categoryData;
      // 2.修改数据
      // console.log(res)
      categoryData[index].categoryDetail = res.data;
      // console.log(categoryData[index].categoryDetail)
      //3.修改data的数据
      this.setData({
        categoryData: categoryData
      })
    })
  }
})

