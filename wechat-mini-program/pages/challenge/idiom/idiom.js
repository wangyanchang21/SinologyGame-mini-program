// pages/challenge/idiom/idiom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: 1,
    idiom: '胸有成竹',
    idioms: ['胸', '有', '成', '竹'],
    blankIndex: 2,
    blankWord: '',
    puzzles: ['没', '国', '德', '比', '成', '悦', '府', '山', '青', '流', '全', '非', '水', '自', '明'],
    // Failed
    isFailed: false,
    failedTitle: '挑战失败，获得复活机会！',
    failedGiveUp: '放弃',
    failedRevive: '花虾出借100w',
    adURL: 'https://apitest.huaxiafinance.com/laoxia2/laoxia.html',
    // Success
    isSuccess: false,
    successTitle: '挑战成功',
    successContent: '完整成语为：',
    successHome: '首页',
    successNext: '下一关'
  },

  onLoad() {
    let level = getApp().globalData.currentLevel;
    this.setData({
      level: level
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  chooseWord(event) {
    console.log(this.data.blankIndex);
    let data = this.data;
    let correctWord = data.idioms[data.blankIndex];
    let selIndex = event.currentTarget.dataset.selIndex;
    let selWord = data.puzzles[selIndex];
    console.log(selWord);

    if (correctWord == selWord) {
      // Success
      this.setData({
        blankWord: selWord
      });
      getApp().globalData.currentLevel = this.data.level + 1;
      this.setData({
        isSuccess: true
      });
    } else {
      // Failed to show HuaxiaAd
      this.setData({
        isFailed: true
      });
    }
  },

  // Success
  goToNext() {
    wx.redirectTo({
      url: '/pages/challenge/idiom/idiom'
    })
  },
  redirectToHome() {
    wx.navigateBack({
      url: '/pages/challenge/challenge',
    });
  },

  // Failed Dialog
  closeHuaxiaAd() {
    this.setData({
      isFailed: false
    });
  },
  goToAdPage() {
    wx.navigateTo({
      url: `/pages/common/web-view?url=${this.data.adURL}`
    })
  }
})