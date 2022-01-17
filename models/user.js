const Sequalize = require('sequelize');

const db = require('../util/database')


const User = db.define('user', {

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
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
    },
    dob: {
        type: Sequalize.DATEONLY,
        allowNull: false,
    },
    address: {
        type: Sequalize.STRING,
        allowNull: true,
    },
    password: {
        type: Sequalize.STRING
    },
    SNI: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: Sequalize.DATE
    },
    token:{
type: Sequalize.STRING,
allowNull: true
    }
})



module.exports = User;