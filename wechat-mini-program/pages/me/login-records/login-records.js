// pages/me/login-records/login-records.js
const util = require('../../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {
    let that = this;

    that.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
