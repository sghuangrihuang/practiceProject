var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')
var url = require('url')

var app = express();

app.get('/', function (req, res, next) {
  var tab = req.query.tab || 'all';  //all good share ask job dev 
  var page = req.query.page || 1; // number
  superagent.get(`https://cnodejs.org/?tab=${tab}&page=${page}`).end(function (err, sres) {
    if (err) {
      return next(err)
    }
    var $ = cheerio.load(sres.text);
    var items = [];
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      });
    });
    res.send(JSON.stringify(items));
  })
 
})

app.listen(3000, function (req, res) {
  console.log('over');
})