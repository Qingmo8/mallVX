// pages/category/child/h-content/h-content.js

const types = ['pop', 'new', 'sell']
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array,
      // value:[]
    },
    categoryDetail: {
      type: Array,
      // value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },
  observers: {
    categoryDetail: function (newValue) {
      // console.log(newValue) 
    }
  },
  lifetimes: {
    ready() {
      // console.log(this.properties.categoryDetail)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      // console.log(e)
      // console.log(this.properties.categoryDetail)
      // //1.获取当前的点击
      // const currentIndex = e.detail.index;

      // //获取当前的type
      // let currentType = types[currenyIndex]

      // //3.改变data的数据
      // this.setData({
      //   currentIndex,
      //   currentType
      // })
    
    
    }
  }
})
