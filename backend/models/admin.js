const Sequalize = require('sequelize');

const db = require('../util/database')


const Admin = db.define('admin', {

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
        defaultValue:'Admin'
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
        defaultValue:'admin@shangrila.gov.un'
    },
    password: {
        type: Sequalize.STRING,
        defaultValue:'shangrila@2021$'
    },
    createdAt: {
        type: Sequalize.DATE
    },
    token:{
type: Sequalize.STRING,
allowNull: true
    }
})



module.exports = Admin;