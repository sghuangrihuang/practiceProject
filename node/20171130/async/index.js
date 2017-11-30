const async = require('async')

var urls = [];
for (var i = 0 ; i < 30 ; i++) {
  urls.push(`http://datasource_${i}`);
}

// 并发连接数的计时器
var concurrencyCount = 0;

var fetchUrl = (url, callback) => {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++
  console.log(`现在的并发数是 ${concurrencyCount} ，正在抓取的是 ${url} , 耗时  ${delay}  毫秒`);

  setTimeout(() => {
    concurrencyCount--;
    callback(null, url + ' html content')
  }, delay);

}

async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  if (err) throw err;
  // 访问完成回调函数
  console.log('final:');
  console.log(result);
});