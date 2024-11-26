const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 's1200999', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

