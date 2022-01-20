


const Sequalize = require('sequelize');

const db = require('../util/database')
const Login = db.define('login', {

    tokenId:{
        type:Sequalize.INTEGER,
         primaryKey: true,
       autoIncrement:true
    },
    verifyToken:{
        type:Sequalize.STRING,
        unique: true
    },
    userId:{
        type:Sequalize.INTEGER
        
    },
    tokentype:{
        type:Sequalize.STRING
    }


})
module.exports = Login;