// pages/challenge/challenge.js
const app = getApp()

Page({
  
  data: {
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad() {

    if (app.globalData.userInfo) {
      this.setData({
        isLogin: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  

  beginGame(e) {
    console.log(e)
    if (this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/challenge/idiom/idiom'
      });
    } else {
      let userInfo = e.detail.userInfo;
      if (userInfo) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          isLogin: true
        });
      }
    }
  }
})