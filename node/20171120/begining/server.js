var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.end('Hello Node.js\n');
})

server.listen(1337, '127.0.0.1');

console.log("server running at http://127.0.0.1:1337/");