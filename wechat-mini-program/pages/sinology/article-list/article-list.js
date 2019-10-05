// pages/sinology/article-list/article-list.js

const util = require('../../../utils/util.js')

Page({

  data: {
    page: 0,
    totalPages: 0,
    listInterface: '',
    
    title: '',
    articles: []
  },

  onLoad(options) {
    let that = this;

    that.setData({
      title: options.title
    });

    // 初次加载，确定接口和总页数
    that.makeInterfaceAndPages();
  },

  onReachBottom() {
    let that = this;

    // 下拉触底，先判断是否有请求正在进行中
    if (!that.loading && that.data.page <= that.data.totalPages) {
      that.loading = true;
      that.requestPoemList(that.data.page);
    }
  },

  onReady: function () {
    let that = this;

    // 请求第一页数据
    that.requestPoemList();
  },

  // 接口和总页数分类
  makeInterfaceAndPages() {
    let that = this;

    var book = '';
    var bookPages = 0;
    if (that.data.title == '唐诗') {
      book = 'getTangList';
      bookPages = 55;
    } else if (that.data.title == '宋词') {
      book = 'getSongList';
      bookPages = 21;
    } else if (that.data.title == '论语') {
      book = 'getLunyuList';
    } else if (that.data.title == '孟子') {
      book = 'getMengziList';
    } else if (that.data.title == '诗经') {
      book = 'getShijingList';
    } else if (that.data.title == '大学') {
      book = 'getDaxue';
    } else if (that.data.title == '中庸') {
      book = 'getZhongyong';
    }

    that.setData({
      listInterface: book,
      totalPages: bookPages
    });

  },

  requestPoemList() {
    wx.showLoading({
      title: '加载中',
    });

    // Request
    var that = this;
    wx.request({
      url: util.server + that.data.listInterface,
      data: {
        page: that.data.page
      },
      success: res => {
        // 数据拼接
        if (res.data.isSuccess) {
          that.setData({
            articles: that.data.articles.concat(res.data.data)
          });
        }
      },
      complete: res => {
        // 更新当前页数，结束 Loading
        wx.hideLoading();
        that.setData({
          page: that.data.page + 1
        });
      }
    });
  },

  goToDetail(event) {
    let that = this;

    let index = event.currentTarget.dataset.selectNum;
    let poem = that.data.articles[index];
    var poemJson = JSON.stringify(poem);
    console.log(poem);

    wx.navigateTo({
      url: `/pages/sinology/article/article?poem=${poemJson}`
    });
  }
})