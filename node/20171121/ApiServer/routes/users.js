var express = require('express');
var URL = require('url');
var User = require('./user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserInfo', function(req, res, next) {
  var user = new User();
  var params = URL.parse(req.url, true).query;

  if (params.id == 1) {
    user.role_id = 'user';
    user.age = 1;
    user.city = '广州';
  } else {
    user.role_id = 'admin';
    user.age = 10;
    user.city = '上海';
  }
  var response = { 
    status: 1,
    data: user
  };
  
  res.send(JSON.stringify(response));

})


module.exports = router;
