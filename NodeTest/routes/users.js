var express = require('express');
var router = express.Router();
var URL = require('url');
var userDao = require('../dao/userDao');

function User() {
      this.name;
      this.city;
      this.age;
}

router.get('/getUserInfo', function(req, res, next) {

    var user = new User();
    console.info("exe");
    var params = URL.parse(req.url, true).query;

 if(params.id == '1') {

    user.name = "ligh";
    user.age = "1";
    user.city = "北京市";

}else{
    user.name = "SPTING";
    user.age = "1";
    user.city = "杭州市";
}

  var response = {status:1,data:user};
  res.send(JSON.parse(JSON.stringify(response)));
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({status:'json'});
});

/* GET users listing. */
router.get('/blog', function(req, res, next) {
  userDao.list(req, res, next);
});

module.exports = router;
