var express = require('express');
var router = express.Router();
var URL = require('url');
//加载mysql模块
var mysql      = require('mysql');
//创建连接
var connection = mysql.createPool({
host     : 'localhost',
user     : 'root',
password : '123456',
database : 'yjxx',
useConnectionPooling: true
});


//执行创建连接
//connection.connect();
//SQL语句
var  sql = "SELECT count(*) count,DATE_FORMAT(releaseDate,'%Y年%m月') date FROM yjxx.article group by DATE_FORMAT(releaseDate,'%Y年%m月') ";


var $db = require('../config/db');
var pool = $db.connect();


module.exports = {
    //node不会在第一个的sql执行的时候等待,直接执行下面的console.info("getBlogCount logger------>");
    //由于使用res只有一个，所以不管谁先用，会导致后面的一个res不能使用，因为已经返回了，除非建立长连接(没有测试过)
    //如果要执行多个sql,解决可以考虑使用方法嵌套。
    list: function(req, res) {
      var result;
      $db.executeSql(sql, [], function(err, result) {
          //res.json({"result":result});
          console.log(result);
      },pool);
      console.info("getBlogCount logger------>");
       //查
       connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result);
        result1 = result
        //把搜索值输出
       //res.set('Content-Type', 'application/json')
       res.send({"result1":result1});
       });
    }
}
