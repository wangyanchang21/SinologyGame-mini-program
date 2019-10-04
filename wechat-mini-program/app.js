//app.js
const util = require('utils/util.js')

App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);

        if (res.code) {
          this.getSession(res.code);
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });

    // 获取小程序全局唯一后台接口调用凭据
    wx.request({
      url: util.server +'getToken',
      success: res => {
        console.log(res);
        if (res.data.data.access_token) {
          this.globalData.token = res.data.data.access_token;
        }
      }
    });
  },

  // 向后台发起login
  getSession(code) {
    wx.request({
      url: util.server + 'getSession',
      data: {
        code: code
      },
      success: session => {
        console.log(session);

        if (session.data.data.openid) {
          this.globalData.ssessionKey = session.data.data.session_key;
          this.globalData.openId = session.data.data.openid;
          // if (this.openIdReadyCallback) {
          //   this.openIdReadyCallback(session)
          // }
        } else {
          console.log('Session获取失败！' + res.errMsg);
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    ssessionKey: null,
    openId: null,
    token: null,
    currentLevel: 1
  }
})