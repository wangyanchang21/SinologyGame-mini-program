// pages/me/me.js
const app = getApp()

Page({
  data: {
    memberLevel: 5,
    poetryNum: 123,
    wordsNum: 66,
    userInfo: {},
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad() {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            isLogin: true
          })
        }
      })
    }
  },

  onPullDownRefresh() {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 3000);
  },

  //事件处理函数
  bindViewTap() {
    // debug状态下执行
    wx.navigateTo({
      url: '/pages/me/login-records/login-records'
    })
  },

  getUserInfo(e) {
    console.log(e)
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        isLogin: true
      })
    }
  }
})
