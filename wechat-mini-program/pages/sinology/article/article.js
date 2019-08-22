// pages/sinology/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    chapter: "",
    section: "",
    author: "",
    paragraphs: []
  },

  onLoad(options) {
    var poemJson = JSON.parse(options.poem)

    this.setData({
      title: poemJson.title,
      chapter: poemJson.chapter,
      section: poemJson.section,
      author: poemJson.author,
      paragraphs: poemJson.paragraphs,
    });
  },

  onShareAppMessage: function () {

  }
})