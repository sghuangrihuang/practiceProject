const async = require('async')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')
const superagent = require('superagent')
const fs = require('fs')
const url = require('url')



var ep = new eventproxy(),
  urlsArray = [], // 存放爬虫地址
  pageUrls = [], // 存放收集文章页面网站
  pageNum = 20, // 爬取文章的页数
  catchDate = [], // 存放爬取数据
  cnodeUrl = "https://cnodejs.org";

for (var i = 1; i <= 1; i++) {
  pageUrls.push('https://cnodejs.org/?tab=all&page=' + i);
}

ep.after('BlogArticleHtml', pageUrls.length * 40, (articleUrls) => {

  async.mapLimit(articleUrls, 5, function (url, callback) {
    reptileMove(url, callback);
  }, function (err, result) {
    // 完成之后的回调函数
    console.log('final:');
    console.log(`result length: ${result.length}`);
    console.log(result);
    fs.writeFile('./data.json', JSON.stringify(catchDate),  function(err) {
      if (err) {
        return console.error(err);
      }
      console.log("数据写入成功！");
    });
  });

})

// 控制并发数
var curCount = 0;

var reptileMove = (url, callback) => {
  // 延迟
  var delay = parseInt((Math.random() * 30000000) % 1000, 10);

  curCount++;
  console.log('现在的并发数是', curCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

  superagent.get(url)
    .end((err, pres) => {
      var $ = cheerio.load(pres.text);
      var curMess = $('.topic_header');
      var messInfo = {
        "title": curMess.find('.topic_full_title').text().trim(),
        "data": curMess.find(".changes span").eq(2).text().trim()
      }
      catchDate.push(messInfo);
    })

  setTimeout(function () {
    curCount--;
    callback(null, url + '  html request');
  }, delay);
}

pageUrls.forEach(function (pageUrl) {

  superagent.get(pageUrl)
    .end(function (err, pres) {
      var $ = cheerio.load(pres.text);
      var curPageUrls = $('#topic_list .cell'); //40

      for (var i = 0; i < curPageUrls.length; i++) {
        var articleUrl = cnodeUrl + curPageUrls.eq(i).find('.topic_title').attr('href');
        urlsArray.push(articleUrl);
        // 相当于一个计数器
        ep.emit('BlogArticleHtml', articleUrl);
      }
    });
})