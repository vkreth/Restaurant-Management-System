const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart.controller');

router.get('/:userId', cart.getCartDetails);
router.post('/:id', cart.addProduct);
router.delete('/:id/:productId', cart.removeProduct);
router.delete('/:id', cart.delete);
router.put('/add/:id/:productId', cart.addQuantity);
router.put('/reduce/:id/:productId', cart.reduceQuantity);

module.exports = router;
