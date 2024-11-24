const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        // fetcg old cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                }
            }
            // find existing product
            const existProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existProduct = cart.products[existProductIndex];
            let updatedProduct;
            // add new product
            if(existProduct){
                updatedProduct = {...existProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
};