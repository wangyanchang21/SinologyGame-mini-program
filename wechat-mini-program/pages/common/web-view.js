// pages/common/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  onLoad(options) {
    console.log(options.url);

    this.setData({
      url: options.url
    });
  },

  loadSuccess() {
    console.log('web加载完成');
  },

  loadFailed(error) {
    console.log(error);
  },
  
  receiveMsg(msg) {
    wx.showToast({
      title: `消息：${msg}`
    })
  }
})