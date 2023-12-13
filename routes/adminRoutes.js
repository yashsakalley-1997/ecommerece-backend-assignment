const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create a new product
router.post('/products', adminController.createProduct);

// get all products
router.get('/products', adminController.getAllProducts);

module.exports = router;
