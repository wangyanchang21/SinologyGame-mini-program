// pages/sinology/article-list/article-list.js
Page({

  data: {
    title: '',
    articles: [
      {
        title: '鼓吹曲辭 將進酒',
        author: '李白'
      },
      {
        title: '橫吹曲辭 前出塞九首 七',
        author: '杜甫'
      }, 
      {
        title: '鼓吹曲辭 臨高臺',
        author: '王勃'
      },
      {
        title: '橫吹曲辭 隴頭吟',
        author: '王維'
      },
      {
        title: '橫吹曲辭 出塞 一',
        author: '王昌齡'
      }
    ]
  },

  onLoad(options) {
    console.log(options.title);
    this.setData({
      title: options.title
    });
  },

  onShareAppMessage: function () {

  },

  goToDetail(event) {
    let title = event.currentTarget.dataset.selectTitle;
    wx.navigateTo({
      url: `/pages/sinology/article/article?title=${title}`
    });
  }
})