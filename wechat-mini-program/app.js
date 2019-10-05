//app.js
const util = require('utils/util.js')

App({
  onLaunch: function () {
    let that = this;

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);

        if (res.code) {
          that.getSession(res.code);
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
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
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
          that.globalData.token = res.data.data.access_token;
        }
      }
    });
  },

  // 向后台发起login
  getSession(code) {
    let that = this;

    wx.request({
      url: util.server + 'getSession',
      data: {
        code: code
      },
      success: session => {
        console.log(session);

        if (session.data.data.openid) {
          that.globalData.ssessionKey = session.data.data.session_key;
          that.globalData.openId = session.data.data.openid;
          if (that.openIdReadyCallback) {
            that.openIdReadyCallback(session)
          }
          that.requestUserDetail();
        } else {
          console.log('Session获取失败！' + res.errMsg);
        }
      }
    });
  },

  requestUserDetail() {
    let that = this;
    
    wx.request({
      url: util.server + 'getUserInfo',
      data: {
        openId: that.globalData.openId
      },
      success: res => {
        if (res.data.isSuccess) {
          console.log(res.data.data)
          that.globalData.bestPass = res.data.data.bestPass;
          that.globalData.currentPass = res.data.data.currentPass;
          that.globalData.userLevel = res.data.data.userLevel;
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    ssessionKey: null,
    openId: null,
    token: null,
    userLevel: 1,
    bestPass: 1,
    currentPass: 1
  }
})