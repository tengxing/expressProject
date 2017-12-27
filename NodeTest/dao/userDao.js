/**
 * ==============================
 * @Author:   X.Teng
 * @Version:  1.0 
 * @DateTime: 2017-12-27 16:23:23
 * ==============================
 */
var URL = require('url');
//SQL语句
var  sql = "SELECT * FROM yjxx.article_type ";


var $db = require('../config/db');
var pool = $db.connect();


module.exports = {
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

      function User() {
            this.name;
            this.city;
            this.age;
      }
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

      $db.executeSql(sql, [], function(err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        } 
        var response = {status:1,data:user};
        res.json(response);
      },pool);
    }
}
