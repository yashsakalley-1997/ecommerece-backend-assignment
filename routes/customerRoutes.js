const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Add to cart
router.post('/cart/add', customerController.addToCart);

// Get user cart
router.get('/cart/:userId', customerController.getUserCart);

router.post('/cart/place-order', customerController.placeOrder);

router.get('/user-orders/:userId', customerController.getUserOrders);

module.exports = router;