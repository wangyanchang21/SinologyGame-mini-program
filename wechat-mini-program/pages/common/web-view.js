// pages/common/web-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  onLoad(options) {
    let that = this;
    console.log(options.url);

    that.setData({
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