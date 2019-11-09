// pages/me/me.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    memberLevel: 1,
    bestPass: 1,
    poetryNum: 1,
    wordsNum: 1,
    userInfo: {},
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad() {
    let that = this;

    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        isLogin: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            isLogin: true
          })
        }
      })
    }
  },

  onShow() {
    let that = this;

    that.requestNewestUserInfo();
  },

  requestNewestUserInfo() {
    let that = this;

    wx.request({
      url: util.server + 'getUserInfo',
      data: {
        openId: app.globalData.openId
      },
      success: res => {
        if (res.data.isSuccess) {
          that.setData({
            bestPass: res.data.bestPass,
            memberLevel: res.data.userLevel
          });
          app.globalData.bestPass = res.data.data.bestPass;
          app.globalData.currentPass = res.data.data.currentPass;
          app.globalData.userLevel = res.data.data.userLevel;
          
          that.aynchronousUserInfo();
        }
      }
    })
  },

  aynchronousUserInfo() {
    let that = this;

    // 同步最高破关和用户等级
    if (app.globalData.bestPass) {
      that.setData({
        bestPass: app.globalData.bestPass,
      })
    }
    if (app.globalData.userLevel) {
      that.setData({
        memberLevel: app.globalData.userLevel
      })
    }
    console.log(app.globalData.bestPass)
    console.log(that.data.bestPass)
  },

  onPullDownRefresh() {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 3000);
  },

  //事件处理函数
  bindViewTap() {
    // debug状态下执行
    // wx.navigateTo({
    //   url: '/pages/me/login-records/login-records'
    // })
  },

  getUserInfo(e) {
    let that = this;

    console.log(e)
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        isLogin: true
      })
    }
    that.requestToRegisterOrUpdateUserDetail();
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
