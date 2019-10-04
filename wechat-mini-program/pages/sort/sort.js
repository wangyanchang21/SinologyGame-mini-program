// pages/sort/sort.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: [
      {
        name: '尼古拉斯·赵四',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/808db6b06ff34e5abd46d8cc68619fda!400x400.jpeg',
        passLevel: 996,
        rank: 1
      },
      {
        name: '赛斯·库日天',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/08ed5992efad41a894ebafb2a1208285!400x400.jpeg',
        passLevel: 868,
        rank: 2
      },
      {
        name: '霍华德·天霸',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/600a5fa2332f4a7cbc76513c73929f7a!400x400.jpeg',
        passLevel: 697,
        rank: 3
      },
      {
        name: '史珍香',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/ee603b6960d6482f8773552ce051953f!400x400.jpeg',
        passLevel: 689,
        rank: 4
      },
      {
        name: '杜子腾',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/cd3c0cb582f84696b149ab925571399a!400x400.jpeg',
        passLevel: 636,
        rank: 5
      },
      {
        name: '秦寿生',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/55797a5dbf554045b98897b32a62fb7a!400x400.jpeg',
        passLevel: 633,
        rank: 6
      },
      {
        name: '范统',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/74d933d7ed0440469b53438573356c21!400x400.jpeg',
        passLevel: 631,
        rank: 7
      },
      {
        name: '庞光',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/790888d9b4534ff3873834107f808650!400x400.jpeg',
        passLevel: 601,
        rank: 8
      },
      {
        name: '姬从良',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/e5174528b0a94ee5bfabf8c1c68980c8!400x400.jpeg',
        passLevel: 568,
        rank: 9
      },
      {
        name: '史旦',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/25/d19b33bb16754141baa3ed60f3592896!400x400.jpeg',
        passLevel: 558,
        rank: 10
      },
      {
        name: '史科朗',
        avatorURL: 'https://img2.woyaogexing.com/2019/04/26/744b7bea06aa3e7f!400x400_big.jpg',
        passLevel: 521,
        rank: 11
      },
      {
        name: '尿喝大了酒多',
        avatorURL: 'https://img2.woyaogexing.com/2019/08/09/2ddddb23c6ea413d94cd9747691320a6!400x400.jpeg',
        passLevel: 520,
        rank: 12
      },
      {
        name: '愿闻其翔',
        avatorURL: 'https://img2.woyaogexing.com/2019/08/08/0faf073808044a0d855795ad1beb21fa!400x400.jpeg',
        passLevel: 502,
        rank: 13
      },
      {
        name: '骑猪看日出',
        avatorURL: 'https://img2.woyaogexing.com/2019/08/08/af9fc26cc68546118cec3b753be35b73!400x400.jpeg',
        passLevel: 501,
        rank: 14
      },
      {
        name: '吊儿郎当',
        avatorURL: 'https://img2.woyaogexing.com/2019/08/09/5527c1cdee6545449a76513e7487bae4!400x400.jpeg',
        passLevel: 500,
        rank: 15
      }
    ]
  },

  onPullDownRefresh() {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 3000);
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestRanklist();
  },

  requestRanklist() {
    wx.request({
      url: util.server + 'getUserRankList',
      success: res => {
        if (res.data.isSuccess) {
          console.log(res.data.data)
          this.setData({
            sort: res.data.data
          })
        }
      }
    })
  }
})