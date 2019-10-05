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
    let that = this;

    var poemJson = JSON.parse(options.poem)

    that.setData({
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