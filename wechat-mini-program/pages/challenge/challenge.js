// pages/challenge/challenge.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  
  data: {
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad() {
    let that = this;

    if (app.globalData.userInfo) {
      that.setData({
        isLogin: true
      });
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // getUserInfo(e) {
  //   let that = this;

  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   that.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  //   that.requestToRegisterOrUpdateUserDetail()
  // },

  beginGame(e) {
    let that = this;

    console.log(e)
    if (that.data.isLogin) {
      wx.navigateTo({
        url: '/pages/challenge/idiom/idiom'
      });
    } else {

      let userInfo = e.detail.userInfo;
      if (userInfo) {
        app.globalData.userInfo = e.detail.userInfo;
        that.setData({
          isLogin: true
        });
      }
      that.requestToRegisterOrUpdateUserDetail()
    }
  },

  requestToRegisterOrUpdateUserDetail() {
    wx.request({
      url: util.server + 'registerOrUpdateUser',
      data: {
        openId: app.globalData.openId,
        userName: app.globalData.userInfo.nickName,
        userAvatar: app.globalData.userInfo.avatarUrl
      },
      success: res => {
        console.log(res.data)
        if (res.data.isSuccess) {
          console.log('数据注册或更新成功')
        }
      }
    })
  }
})