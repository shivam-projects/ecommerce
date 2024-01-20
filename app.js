var express = require('express');
var path = require('path');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/product')
const cartRouter= require("./routes/cart")
const orderRouter= require('./routes/order')
const paymentRouter= require('./routes/payment')
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ecommerce', usersRouter);
app.use('/ecommerce', productRouter);
app.use('/ecommerce',  cartRouter);
app.use('/ecommerce/orders',  orderRouter);
app.use('/ecommerce', paymentRouter)
module.exports = app;

//Connect hbs

app.use(express.static(__dirname, + '../public'))
  app.set('view engine', 'hbs');

  app.get('/', (req, res) =>{
    res.render('index')
  })