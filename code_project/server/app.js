var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter')
const JWT = require('./util/JWT');
const StockRouter = require('./routes/admin/StockRouter')
const webStockRouter = require('./routes/web/StockRouter')
const PurshasingRouter = require('./routes/admin/PurshasingRouter')
const SalesRouter = require('./routes/admin/SalesRouter')
const NewsRouter = require('./routes/admin/NewsRouter')
const webNewsRouter = require('./routes/web/NewsRouter')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(webStockRouter);
app.use(webNewsRouter);


require("./config/db.config")
require("./models/UserModel")


// const app = express();




// /adminapi/*
app.use((req, res,next) => {
  //如果授权通过，next();
  // 如果token过期，return401;
  if (req.url==="/adminapi/user/login"){
    next()
    return;

  }
  const token = req.headers["authorization"].split(" ")[1]
  if (token){
    var payload = JWT.verify(token)
    // console.log(token)
    if (payload){
      const newToken = JWT.generate({
        id: payload.id,
        username: payload.username
      },"1d")
      res.header("Authorization", newToken)
      // const
      next()
    }else{
      // res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }

  }
})

app.use(UserRouter);
app.use(StockRouter);
app.use(PurshasingRouter);
app.use(SalesRouter);
app.use(NewsRouter);
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
