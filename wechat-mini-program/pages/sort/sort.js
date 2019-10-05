// pages/sort/sort.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: [
      {
        serName: '尼古拉斯·赵四',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/808db6b06ff34e5abd46d8cc68619fda!400x400.jpeg',
        bestPass: 996
      },
      {
        serName: '赛斯·库日天',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/08ed5992efad41a894ebafb2a1208285!400x400.jpeg',
        bestPass: 868
      },
      {
        serName: '霍华德·天霸',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/600a5fa2332f4a7cbc76513c73929f7a!400x400.jpeg',
        bestPass: 697
      },
      {
        serName: '史珍香',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/ee603b6960d6482f8773552ce051953f!400x400.jpeg',
        bestPass: 689
      },
      {
        serName: '杜子腾',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/cd3c0cb582f84696b149ab925571399a!400x400.jpeg',
        bestPass: 636
      },
      {
        serName: '秦寿生',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/55797a5dbf554045b98897b32a62fb7a!400x400.jpeg',
        bestPass: 633
      },
      {
        serName: '范统',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/74d933d7ed0440469b53438573356c21!400x400.jpeg',
        bestPass: 631
      },
      {
        serName: '庞光',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/790888d9b4534ff3873834107f808650!400x400.jpeg',
        bestPass: 601
      },
      {
        serName: '姬从良',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/e5174528b0a94ee5bfabf8c1c68980c8!400x400.jpeg',
        bestPass: 568
      },
      {
        serName: '史旦',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/25/d19b33bb16754141baa3ed60f3592896!400x400.jpeg',
        bestPass: 558
      },
      {
        serName: '史科朗',
        userAvatar: 'https://img2.woyaogexing.com/2019/04/26/744b7bea06aa3e7f!400x400_big.jpg',
        bestPass: 521
      },
      {
        serName: '尿喝大了酒多',
        userAvatar: 'https://img2.woyaogexing.com/2019/08/09/2ddddb23c6ea413d94cd9747691320a6!400x400.jpeg',
        bestPass: 520
      },
      {
        serName: '愿闻其翔',
        userAvatar: 'https://img2.woyaogexing.com/2019/08/08/0faf073808044a0d855795ad1beb21fa!400x400.jpeg',
        bestPass: 502
      },
      {
        serName: '骑猪看日出',
        userAvatar: 'https://img2.woyaogexing.com/2019/08/08/af9fc26cc68546118cec3b753be35b73!400x400.jpeg',
        bestPass: 501
      },
      {
        serName: '吊儿郎当',
        userAvatar: 'https://img2.woyaogexing.com/2019/08/09/5527c1cdee6545449a76513e7487bae4!400x400.jpeg',
        bestPass: 500
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