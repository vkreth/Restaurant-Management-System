const User = require('../models/user');
const Order = require('../models/order');
const foodItem = require('../models/foodItem');

const dashboard = async (req, res) => {
    try {
        const users = await User.find().countDocuments();
        const orders = await Order.find().countDocuments();
        const foodItems = await foodItem.find().countDocuments();
        res.json({users, orders, foodItems});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {dashboard};
