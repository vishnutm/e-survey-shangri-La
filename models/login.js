const Sequalize = require('sequelize'),
const db = require('../util/database'),

const Login =db.define('login',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    username:{
        type:Sequalize.STRING,
        unique: true,
    },
    lastLogin:{
        type:Sequalize.Date,
        notNull: true,
    },
    token:{
        type:Sequalize.STRING,
    }
})

module.exports =Login;