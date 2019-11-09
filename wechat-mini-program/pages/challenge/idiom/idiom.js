// pages/challenge/idiom/idiom.js
const app = getApp()
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // request data
    idioms: [],
    puzzles: [],

    // made-up data
    pass: 1,
    idiom: '',
    blankIndex: 0,
    blankWord: '',
    useIdioms: [],
    usePuzzles:[],

    // Failed
    isFailed: false,
    failedTitle: '挑战失败，获得复活机会！',
    failedGiveUp: '放弃复活',
    failedRevive: '中国万岁',
    adURL: 'https://baike.baidu.com/item/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD/106554',
    // Success
    isSuccess: false,
    successTitle: '挑战成功',
    successContent: '完整成语为：',
    successHome: '首页',
    successNext: '下一关'
  },

  onLoad() {
    let that = this;

    let pass = app.globalData.currentPass
    console.log(pass)
    that.setData({
      pass: pass
    });
  },

  onReady: function () {
    let that = this;

    that.requestIdiomList();
  },

  // Request
  requestIdiomList() {
    var that = this;

    wx.showLoading({
      title: '加载中',
    });

    wx.request({
      url: util.server + 'getIdiomList',
      success: res => {
        if (res.data.isSuccess) {
          that.setData({
            idioms: res.data.data.idioms,
            puzzles: res.data.data.puzzles
          });
        }
      },
      complete: res => {
        wx.hideLoading();
        that.makeIdiomData();
      }
    });
  },

  makeIdiomData() {
    let that = this;

    // 成语
    let idiomString = that.data.idioms[that.data.pass - 1];
    let showIdiom = idiomString.split('');

    // 缺失字
    // 此处不可为随机
    let missIndex = 3 - that.data.pass % 4;    
    let missWord = idiomString[missIndex];

    // 迷惑项
    let puzzleShow = 15;
    let puzzleTotal = 1751;
    var showPuzzle = new Array();
    for (var num = 0; num < puzzleShow; num++) {
      let random = Math.floor(Math.random() * puzzleTotal);
      let word = that.data.puzzles[random];
      showPuzzle.push(word);
    }
    // 随机替换为缺失字
    let rand = Math.floor(Math.random() * puzzleShow);
    showPuzzle[rand] = missWord;

    that.setData({
      idiom: idiomString,
      blankIndex: missIndex,
      useIdioms: showIdiom,
      usePuzzles: showPuzzle
    });

  },

  chooseWord(event) {
    let that = this;

    console.log(that.data.blankIndex);
    let data = that.data;
    let correctWord = data.useIdioms[data.blankIndex];
    let selIndex = event.currentTarget.dataset.selIndex;
    let selWord = data.usePuzzles[selIndex];
    console.log(selWord);

    if (correctWord == selWord) {
      // Success
      that.setData({
        blankWord: selWord
      });
      app.globalData.currentPass = that.data.pass + 1;
      that.requestToUpdatePass();

      that.setData({
        isSuccess: true
      });

      that.request
    } else {
      // Failed to show Ad
      that.setData({
        isFailed: true
      });
    }
  },

  requestToUpdatePass() {
    wx.request({
      url: util.server + 'updateUserInfo',
      data: {
        openId: app.globalData.openId,
        currentPass: app.globalData.currentPass
      },
      success: res => {
        if (res.data.isSuccess) {
          console.log(res.data.data)
        }
      }
    });
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
  closeAd() {
    let that = this;

    that.setData({
      isFailed: false
    });
  },
  goToAdPage() {
    // 暂不跳转
    // let that = this;
    // wx.navigateTo({
    //   url: `/pages/common/web-view?url=${that.data.adURL}`
    // })
  }
})