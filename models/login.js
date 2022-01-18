


const Sequalize = require('sequelize');

const db = require('../util/database')



const Login = db.define('login', {

    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
    },
    lastLogin: {
        type: Sequalize.DATE,
        allowNull: false
    },
    token: {
        type: Sequalize.STRING
    },

})
module.exports = Login;