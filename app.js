var createError = require('http-errors');
var express = require('express');
var path = require('path');
//引入cookie文件
var cookieParser = require('cookie-parser');
//引入关于post提交数据的
var bodyParser = require('body-parser');
var logger = require('morgan');
// //引入session模块
// const session = require("express-session");

var indexRouter = require('./routes/index');
var stuRouter = require('./routes/stu');
var teacherRouter = require('./routes/teacher');
var systerRouter = require('./routes/syster');
var classRouter = require('./routes/class');


var app = express();


//跨域CORS配置
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json");
  next();
});

// view engine setup
//配置模板的文件路径
app.set('views', path.join(__dirname, 'views'));
//配置模板引擎
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
//设置接收任何数据类型
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置用来接收json格式的数据
app.use(bodyParser.json());
//设置接收任何数据类型
app.use(bodyParser.urlencoded({extended: true}));
//设置静态文件的加载(js,css,img)
app.use(express.static(path.join(__dirname, 'public')));
// app.user(express.session({
//   secret: setting.cookieSecret,
//   store: new MongoStore({
//     db: setting.db
//   })
// }));
//设置cookie,其中()里面的是密钥，随便写

app.use(cookieParser("aaa"))
//给session设置密钥
// app.use(session({secret:"bbb"}));

app.use((req,res,next)=>{
    if (req.cookies.login){
        res.locals.login = req.cookies.login.name;
    }
    //不管怎么样都往下执行
    next();
})

//express.cookieParser()是Cookie解析的中间件。
//express.session()则提供回话支持，设置它的store参数为MongoStore实例
//把会话信息存储在数据库中，以免丢失
app.use('/user', indexRouter);
app.use('/stu', stuRouter);
app.use('/teacher', teacherRouter);
app.use('/syster', systerRouter);
app.use('/class',classRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
