// components/h-goods-item/h-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsitem: {
      type: Object,
      value: {}
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      //1.获取ID
      // console.log(e)
      // console.log(this.data)
      // console.log(this.data.goodsitem)
      const iid = this.data.goodsitem.iid;
      console.log(iid)
      //2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }
  }
})
