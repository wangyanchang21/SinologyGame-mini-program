Page({
  data: {
    books: [
      '论语',
      '孟子',
      '唐诗',
      '诗经',
      '宋词',
      '大学',
      '中庸'
    ]
  },

  goToArticleList(event) {
    let book = event.currentTarget.dataset.selectBook;
    wx.navigateTo({
      url: `/pages/sinology/article-list/article-list?title=${book}`
    });
  }
})