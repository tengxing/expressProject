/**
 * ==============================
 * @Author: X.Teng
 * @Version: 1.0 
 * @DateTime: 2017-12-27 16:23:42
 * ==============================
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 第三方中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session验证
app.use(session({
  name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'thisisasecret',
  cookie : {
    maxAge : 60000 * 20 //20 minutes  ms
  }
}));

// 应用级中间件
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //console.error(err.stack);
  res.status(500).send('Something broke!');
});

//node app.js 8000
var process = require('process');
var port = (function () {
  if (typeof (process.argv[2]) !== 'undefined') { // 如果输入了端口号，则提取出来
    if (isNaN(process.argv[2])) { // 如果端口号不为数字，提示格式错误
      throw 'Please write a correct port number.'
    } else { // 如果端口号输入正确，将其应用到端口
      return process.argv[2];
    }
  } else { // 如果未输入端口号，则使用下面定义的默认端口
    return 3000;
  }
})();
app.listen(port, function () { 
  console.log('app listening on port ' + port + ' !')
})


// 连接redis数据库
//https://github.com/NodeRedis/node_redis
var redis = require('redis');
var client = redis.createClient('6379','127.0.0.1',{
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});
//client.auth(''); // 传入密码
client.on('connect',function(){
    console.log('connect');
});
client.set("foo_rand000000000000", "OK");
client.get("foo_rand000000000000", function (err, reply) {
    console.log(reply.toString()); // Will print `OK`
});
//储存对象
client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});
client.hgetall("frameworks", function (err, object) {
    console.log(object); // Will print `OK`
});
client.quit()//关闭



var redis = require("redis")
  , subscriber = redis.createClient()
  , publisher  = redis.createClient();

subscriber.on("message", function(channel, message) {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
});

subscriber.subscribe("test");

publisher.publish("test", "haaaaai");
publisher.publish("test", "kthxbai");


module.exports = app;
