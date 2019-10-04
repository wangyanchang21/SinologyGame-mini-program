// pages/me/me.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    memberLevel: 5,
    bestPass: 888,
    poetryNum: 123,
    wordsNum: 66,
    userInfo: {},
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad() {

    if (app.globalData.openId) {
      this.requestUserDetail(app.globalData.openId);
    } else {
      app.openIdReadyCallback = res => {
        this.requestUserDetail(res.openId);
      }
    }

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
    this.requestToRegisterOrUpdateUserDetail();
  },

  requestUserDetail(openId) {
    wx.request({
      url: util.server + 'getUserInfo',
      data: {
        openId: openId
      },
      success: res => {
        if (res.data.isSuccess) {
          console.log(res.data.data)
          this.setData({
            bestPass: res.data.data.bestPass,
            memberLevel: res.data.data.userLevel
          })
        }
      }
    });
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
        if (res.data.isSuccess) {
          console.log('数据注册或更新成功')
        }
      }
    })
  }
})
