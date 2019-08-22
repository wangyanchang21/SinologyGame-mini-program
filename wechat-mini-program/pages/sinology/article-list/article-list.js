// pages/sinology/article-list/article-list.js

const util = require('../../../utils/util.js')

Page({

  data: {
    page: 0,
    totalPages: 10,
    
    title: '',
    articles: []
  },

  onLoad(options) {
    // 页面初次加载，请求第一页数据
    this.requestPoemList(0);

    this.setData({
      title: options.title
    });
  },

  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    if (!this.loading && page < totalPages) {
      this.loading = true;
      this.requestPoemList(page);
    }
  },

  onShareAppMessage: function () {

  },

  requestPoemList(page) {
    var book = '';
    var bookPages = 1;
    if(options.title == '唐诗') {
      book = 'getTangList';
      bookPages = 56;
    } else if (options.title == '宋词') {
      book = 'getSongList';
      bookPages = 22;
    } else if (options.title == '论语') {
      book = 'getLunyuList';
    } else if (options.title == '孟子') {
      book = 'getMengziList';
    } else if (options.title == '诗经') {
      book = 'getShijingList';
    } else if (options.title == '大学') {
      book = 'getDaxue';
    } else if (options.title == '中庸') {
      book = 'getZhongyong';
    }

    var that = this;
    wx.request({
      url: util.server + book,
      data: {
        page: that.page,
        totalPages: totalPages -1
      },
      success: res => {
        if (res.data.isSuccess) {
          console.log(res.data.data);
          that.setData({
            articles: res.data.data
          });
        }
      },
      complete: res => {
        this.loading = false;
      }
    });
  },

  goToDetail(event) {
    let index = event.currentTarget.dataset.selectNum;
    let poem = this.data.articles[index];
    var poemJson = JSON.stringify(poem);

    console.log(poem);

    wx.navigateTo({
      url: `/pages/sinology/article/article?poem=${poemJson}`
    });
  }
})