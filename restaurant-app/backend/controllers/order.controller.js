const Order = require('../models/order');
const Cart = require('../models/cart');
const stripe = require('stripe')('sk_test_51PiJdURpOvRHmJdt7Gxq9xzAG4QOwg18VPqTenZnAEIkcaEy9s2MJmptNONbFvgcrLMNu2aao2RwSF2k4pHxrvWK00epkxIDNR');
const orderController = {
  getOrders: async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({user: userId}).populate('products.product').populate('user');
      return res.status(200).json({message: 'Get orders', data: orders});
    } catch (error) {
      return res.status(500).json({message: 'Internal server error'});
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate('products.product').populate('user');
      return res.status(200).json({message: 'Get orders', data: orders});
    } catch (error) {
      return res.status(500).json({message: 'Internal server error'});
    }
  },
  createOrder: async (req, res) => {
    try {
      const frontend_url = 'http://localhost:5173';
      const {userId: user, products, totalAmount} = req.body;
      const order = await Order.create({user, products, totalAmount});
      if (!order) {
        return res.status(400).json({message: 'Bad request'});
      }
      const resData = await order.populate('products.product');
      const cart = await Cart.findOneAndDelete({ user });
      if (!cart) {
        return res.status(400).json({message: 'An error occurred while deleting the cart'});
      }
      const item =  order.products.map((item) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        }});
      item.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Delivery Charge',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      });
      const session = await stripe.checkout.sessions.create({
        line_items: item,
        mode: 'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${resData._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${resData._id}`
        });

      return res.status(201).json({message: 'Create order', data: session.url});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Internal server error'});
    }
  },
  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      const {status} = req.body;
      const order = await Order.findOneAndUpdate({_id : orderId}, { $set: {status} }, {new: true}).lean();
      return res.status(200).json({message: 'Update order', data: order});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Internal server error'});
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      await Order.findOneAndDelete({orderId: orderId});
      return res.status(204).json({message: 'Delete order'});
    } catch (error) {
      return res.status(500).json({message: 'Internal server error'});
    }
  },
};

module.exports = orderController;
