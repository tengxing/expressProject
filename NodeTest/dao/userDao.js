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


module.exports = {
    list: function(req, res) {
       console.info("getBlogCount logger------>");
       //查
       connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result);
        //把搜索值输出
       res.set('Content-Type', 'application/json')
       res.send({"result":result});
       });
    }
}
