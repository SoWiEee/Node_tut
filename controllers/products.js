const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // action: request to /product
    res.render('add-product', {pageTitle: 'Add Product'});
    // next(); // transfer request to next middleware
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    // request don't parse body by default
    product.save();
    res.redirect('/');
};

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        // send response
        res.render('shop', {prods: products, pageTitle: 'Shop'});
    });
};