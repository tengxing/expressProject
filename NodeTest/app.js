var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
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

module.exports = app;
