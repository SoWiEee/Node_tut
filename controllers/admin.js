const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // action: request to /product
    res.render('admin/add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    // next(); // transfer request to next middleware
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save();                     
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        // send response
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: '/admin/products'});
    });
}