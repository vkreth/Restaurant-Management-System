const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip: String
},{ _id : false });

const UserSchema = new mongoose.Schema({
  userId: { type: String, default: uuid },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  password: { type: String, required: false },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  address: {type: AddressSchema, default: {}, required: false},
  phone: {type: String, default: '', required: false},
  lastLogin: {type: Date, default: Date.now, required: false},
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
