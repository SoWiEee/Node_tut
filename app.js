const path = require('path');

const express = require('express')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')
const sequelize = require('./util/database')

const app = express();
app.set('view engine', 'pug');  // use pug compile dynamic template
app.set('views', 'views');  // template location

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parse body sent from <form>
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))

app.use('/admin', adminRoutes); // only request to /admin will be handled by adminRoutes
app.use(shopRoutes);

app.use(errorController.get404);

// search all models
sequelize
    .sync()
    .then(result => {
        //console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
