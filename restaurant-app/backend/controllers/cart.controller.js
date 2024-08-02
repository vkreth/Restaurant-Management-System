const Cart = require('../models/Cart');

const cartController = {
  getCartDetails: async (req, res) => {
    try {
      const cartItems = await Cart.findOne({user: req.params.userId}).populate('products.product');
      return res.status(200).json({data: cartItems});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  addProduct: async (req, res) => {
    try {
      const userId = req.params.id;
      const {product, quantity} = req.body;
      const cart = await Cart.findOne({user: userId});
      if (!cart) {
        const newCart = await Cart.create({
          user: userId,
          products: [{product, quantity}],
        });
        return res.status(201).json({message: 'Product added to cart', data: newCart});
      }
      const cartDetail = await Cart.findOneAndUpdate(
        {user: userId},
        {
          $push: {products: {product, quantity}},
        },
        {new: true}
      ).populate('products.product');
      return res.status(201).json({message: 'Product added to cart', data: cartDetail});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  removeProduct: async (req, res) => {
    try {
      const {productId, id: userId} = req.params;

      const cart = await Cart.findOne({user: userId}).lean();
      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }
      const product = cart.products.find((item) => item.product.toString() === productId);
      if (!product) {
        return res.status(404).json({message: 'Product not found in cart'});
      }
      const cartDetail = await Cart.findOneAndUpdate(
        {user: userId},
        {
          $pull: {products: {product: productId}}
        },
        {new: true}
      ).populate('products.product');
      return res.status(200).json({message: 'Product removed from cart', data: cartDetail});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  addQuantity: async (req, res) => {
    try {
      const {productId, id: userId} = req.params;
      const cart = await Cart.findOne({user: userId}).lean();
      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }
      const product = cart.products.find((item) => item.product.toString() === productId);
      if (!product) {
        return res.status(404).json({message: 'Product not found in cart'});
      }
      const cartDetail = await Cart.findOneAndUpdate(
        {user: userId, 'products.product': productId},
        {
          $inc: {'products.$.quantity': 1}
        },
        {new: true}
      ).populate('products.product');
      return res.status(200).json({message: 'Product quantity updated', data: cartDetail});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  reduceQuantity: async (req, res) => {
    try {
      const {productId, id: userId} = req.params;
      const cart = await Cart.findOne({user: userId}).lean();
      if (!cart) {
        return res.status(404).json({message: 'Cart not found'});
      }
      const product = cart.products.find((item) => item.product.toString() === productId);
      if (!product) {
        return res.status(404).json({message: 'Product not found in cart'});
      }
      if (product.quantity === 1) {
        return res.status(400).json({message: 'Product quantity cannot be less than 1'});
      }
      const cartDetail = await Cart.findOneAndUpdate(
        {user: userId, 'products.product': productId},
        {
          $inc: {'products.$.quantity': -1}
        },
        {new: true}
      ).populate('products.product');
      return res.status(200).json({message: 'Product quantity updated', data: cartDetail});
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  },
  delete: (req, res) => {
    try {
      Cart.findOneAndDelete({user: req.params.id}, (err, cart) => {
        if (err) {
          return res.status(500).json({error: err.message});
        }
        if (!cart) {
          return res.status(404).json({message: 'Cart not found'});
        }
        return res.status(200).json({message: 'Cart deleted'});
      });
    } catch (e) {
      return res.status(500).json({error: e.message});
    }
  },
};

module.exports = cartController;
