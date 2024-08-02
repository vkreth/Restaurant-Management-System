let controllers = {};
controllers.users = require('./user.controller');
controllers.orders = require('./order.controller');
controllers.foodItems = require('./foodItem.controller');
controllers.cart = require('./cart.controller');
module.exports = controllers;
