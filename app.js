const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

const app = express();

app.set('view engine', 'pug');  // use pug compile dynamic template
app.set('views', 'views');  // template location

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// parse body sent from <form>
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes); // only request to /admin will be handled by adminRoutes
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});


// search all models
sequelize
    .sync()
        .then(result => {
            return User.findByPk(1)
        })
        .then(user => {
            if(!user){
                return User.create({name: 'Max', email: 'max@max'});
            }
            return user;
        })
        .then(user => {
            user.createCart();
        })
        .then(cart => {
            app.listen(3000);
        })
        .catch(err => {
            console.log(err);
        });

