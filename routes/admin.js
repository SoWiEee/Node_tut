const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// only /admin/add-product will be handled by this middleware

// receive function and save it, when receive request then execute it
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts)

// only get request
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router;
