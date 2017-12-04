const express = require('express')
const cookieParser = require('cookie-parser')

var app = express()
app.listen(3000)

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串
// options
// path：表示 cookie 影响到的路径，匹配该路径才发送这个 cookie。
// expires 和 maxAge：告诉浏览器这个 cookie 什么时候过期，expires 是 UTC 格式时间，maxAge 是 cookie 多久后过期的相对时间。当不设置这两个选项时，会产生 session cookie，session cookie 是 transient 的，当用户关闭浏览器时，就被清除。一般用来保存 session 的 session_id。
// secure：当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效。
// httpOnly：浏览器不允许脚本操作 document.cookie 去更改 cookie。一般情况下都应该设置这个为 true，这样可以避免被 xss 攻击拿到 cookie
app.use(cookieParser());

app.get('/', function (req, res) {
  // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
  // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
  if (req.cookies.isVisit) {
    console.log(req.cookies);
    res.send('再次欢迎访问')
  } else {
    res.cookie('isVisit', 1, { maxAge: 60 * 1000 })
    res.send('欢迎第一次访问')
  }
})
