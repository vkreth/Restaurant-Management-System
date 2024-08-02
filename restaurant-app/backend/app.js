const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/users.routes');
const orderRouter = require('./routes/order.routes');
const cartRouter = require('./routes/cart.routes');
const foodItemRouter = require('./routes/foodItem.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let dev_db_url = 'mongodb://localhost:27017/restaurant';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('Error connecting to MongoDB'));

app.use('/users', usersRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/foodItem', foodItemRouter);
app.use('/dashboard', dashboardRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;
