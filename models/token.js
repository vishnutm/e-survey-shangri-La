const Sequalize = require('sequelize');

const db = require('../util/database')



const Token = db.define('token', {

    tokenId: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    verifyToken:{
        type: Sequalize.STRING,
        unique: true
    },
    userId:{
        type: Sequalize.INTEGER,
        
    },
    tokentype:{
        type: Sequalize.STRING
    },
   
})




module.exports =Token;
