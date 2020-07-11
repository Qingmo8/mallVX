// pages/category/child/h-menu/h-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type:Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e) {
      //1.改变当前的currentIndex
      const currentIndex = e.currentTarget.dataset.index;
      // console.log(currentIndex)
      this.setData({
        currentIndex
      })
      //将数据传到上一个页面
      //将最新的currentIndex传递到分类页面
      this.triggerEvent('menuclick', {currentIndex}, {})
    }

  }
})
