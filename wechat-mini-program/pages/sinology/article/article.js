// pages/sinology/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isParagraph: false,  // 只有唐诗宋词诗经是居中，其它都是段落形式的
    title: "",
    chapter: "",
    section: "",
    author: "",
    paragraphs: []
  },

  onLoad(options) {
    let that = this;

    var poemJson = JSON.parse(options.poem)
    var type = options.type
    var isPar = true
    if (type == '唐诗' || type == '宋词' || type == '诗经') {
      isPar = false;
    }

    that.setData({
      title: poemJson.title,
      chapter: poemJson.chapter,
      section: poemJson.section,
      author: poemJson.author,
      paragraphs: poemJson.paragraphs,
      isParagraph: isPar
    });
    console.log(type)
    console.log(isPar)
    console.log(that.data.isParagraph)
  },

  onShareAppMessage: function () {

  }
})