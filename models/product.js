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
    constructor(t){
        this.title = t;
    }

    save(){
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
};