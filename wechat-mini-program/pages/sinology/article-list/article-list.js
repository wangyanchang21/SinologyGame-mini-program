// pages/sinology/article-list/article-list.js

const util = require('../../../utils/util.js')

Page({

  data: {
    title: '',
    articles: [
      {
        title: '',
        author: '',
        strains: [],
        paragraphs: []
      }
    ]
  },

  onLoad(options) {
    console.log(options.title);
    this.setData({
      title: options.title
    });

    var book = '';
    if (options.title == '论语') {
      book = 'getLunyu';
    } else if (options.title == '孟子') {
      book = 'getMengzi';
    } else if (options.title == '唐诗') {
      book = 'getTangList';
    } else if (options.title == '宋词') {
      book = 'getSongList';
    } else if (options.title == '大学') {
      book = 'getDaxue';
    } else if (options.title == '中庸') {
      book = 'getZhongyong';
    } else if (options.title == '诗经') {
      book = 'getShijingList';
    }

    var that = this;
    wx.request({
      url: util.server + book,
      data: {
        page: '0'
      },
      success: res => {
        if (res.data.isSuccess) {
          console.log(res.data.data);
          //that.setData({
            //articles: res.data.data
          //});
        }
      }
    });

  },

  onShareAppMessage: function () {

  },

  goToDetail(event) {
    console.log(this.data.articles);
    console.log(this.data.articles[0]);

    return;
    let title = event.currentTarget.dataset.selectTitle;
    wx.navigateTo({
      url: `/pages/sinology/article/article?title=${title}`
    });
  }
})