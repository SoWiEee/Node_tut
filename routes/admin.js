const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// only /admin/add-product will be handled by this middleware

// receive function and save it, when receive request then execute it
router.get('/add-product', adminController.getAddProduct);

// only get request
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts)


module.exports = router;
