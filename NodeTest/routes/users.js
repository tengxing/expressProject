/**
 * ==============================
 * @Author:   X.Teng
 * @Version:  1.0 
 * @DateTime: 2017-12-27 16:23:12
 * ==============================
 */
var express = require('express');
var router = express.Router();
var URL = require('url');
var userDao = require('../dao/userDao');


/*获取用户信息*/
router.get('/getUserInfo', function(req, res, next) {
  userDao.getUserInfo(req, res, next);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({status:'json'});
});


/*获取blog信息*/
router.get('/blog', function(req, res, next) {
  userDao.blog(req, res, next);
});

module.exports = router;
