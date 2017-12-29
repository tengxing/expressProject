/**
 * ==============================
 * @Author:   X.Teng
 * @Version:  1.0 
 * @DateTime: 2017-12-27 16:23:23
 * ==============================
 */
var URL = require('url');
var User = require("./User");
//SQL语句
var  sql = "SELECT * FROM yjxx.article_type ";


var $db = require('../config/db');
var pool = $db.connect();

var $redisUtil = require('../config/redisUtil');
client = $redisUtil.connect();


module.exports = {
    getRedisValue: function(req, res) {
      var key = "foo_rand000000000000";
      $redisUtil.executeSet(key, "thisisvalue", client);

      console.info("获取redis Key------>"+key);
      $redisUtil.executeGet(key, function(err, result) {
        if(err){
          console.log('[Redis ERROR] - ',err.message);
          return;
        }
          res.json({key:result});
          console.log(result);
      },client);
    },
    blog: function(req, res) {
      console.info("执行sql------>"+sql);
      $db.executeSql(sql, [], function(err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
          res.json({"result":result});
          //console.log(result);
      },pool);
    },
    getUserInfo: function (req, res) {
      console.info("执行sql------>"+sql);

/*      function User() {
            this.name;
            this.city;
            this.age;
      }*/
      var user = new User();
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

      $db.executeSql(sql, [], function(err, result) {
        if(err){
          console.log('[Mysql ERROR] - ',err.message);
          return;
        } 
        var response = {status:1,data:user};
        res.json(response);
      },pool);
    }
}
