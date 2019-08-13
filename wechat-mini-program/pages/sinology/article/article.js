// pages/sinology/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "鼓吹曲辭 將進酒",
    author: "李白",
    paragraphs: [
      "君不見黃河之水天上來，奔流到海不復回。",
      "君不見高堂明鏡悲白髮，朝如青絲暮成雪。",
      "人生得意須盡歡，莫使金尊空對月。",
      "天生我材必有用，千金散盡還復來。",
      "烹羊宰牛且爲樂，會須一飲三百杯。",
      "岑夫子，丹丘生，將進酒，杯莫停。",
      "與君歌一曲，請君爲我側耳聽。",
      "鐘鼓饌玉不足貴，但願長醉不復醒。",
      "古來聖賢皆寂寞，惟有飲者留其名。",
      "陳王昔時宴平樂，斗酒十千恣歡謔。",
      "主人何爲言少錢，徑須酤取對君酌。",
      "五花馬，千金裘，呼兒將出換美酒，與爾同銷萬古愁。asdfasdfsadfsad发大水发水电费第三方第三方第三方第三方是的范德萨"
    ]
  },

  onLoad(options) {
    console.log(options.title);
    this.setData({
      title: options.title
    });
  },

  onShareAppMessage: function () {

  }
})