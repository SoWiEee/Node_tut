const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductFromFile = cb => {
    // async - read product list
    fs.readFile(p, (err, fileContent) => {
        if(err){
            // when list is empty
            cb([]);
        }else{
            // return parsed product list
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        // set ID
        this.id = Math.random().toString();
        getProductFromFile(products => {
            // add product
            products.push(this);
            // update new product list
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb){
        getProductFromFile(cb);
    }

    static findById(id, cb){
        getProductFromFile(products => {
            // sync 
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};