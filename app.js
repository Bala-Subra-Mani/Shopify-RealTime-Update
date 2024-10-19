require('dotenv').config();
var createError = require('http-errors');
console.log("starting")
console.log(process.env.SHOPIFY_STORE_NAME);

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createOrder = require('./routes/create');

const Shopify = require('shopify-api-node');

 const shopify = new Shopify({
   shopName: process.env.SHOPIFY_STORE_NAME,
   accessToken : process.env.SHOPIFY_ACCESS_TOKEN,
   maxRetries: 3
  });

  shopify.product    
    .get(
    {product_id:[10368888701231]})
  
  .then(
    (metafields) => console.log(metafields),
    (err) => console.error(err)
  );


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhooks/orders/create', createOrder);


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
