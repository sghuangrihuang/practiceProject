var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (req, res) {
  // 从 req.query 中取出我们的 q 参数。
  // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
  // 如果分不清什么是 query，什么是 body 的话，那就需要补一下 http 的知识了
  var q = req.query.q;

  if ( !q || q == undefined ) {
    res.send('please check input type');
    return;
  }

  // utility 的 github 地址：https://github.com/node-modules/utility
  var md5Value = utility.md5(q);

  res.send(md5Value);
})
app.listen('3000', function (req, res) {
  console.log('app is runing at port 3000');
})