const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4: uuid} = require('uuid');

const ProductSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'FoodItem'},
    quantity: {type: Number, required: true}
  });

const CartSchema = new Schema({
  cartId: {type: String, default: uuid},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  products: {type: [ProductSchema], required: true}
}, {timestamps: true});

module.exports = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
