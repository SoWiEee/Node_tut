const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// only /admin/add-product will be handled by this middleware

// receive function and save it, when receive request then execute it
router.get('/add-product', productsController.getAddProduct);

// only get request
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
