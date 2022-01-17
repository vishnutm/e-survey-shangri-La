const Sequalize = require('sequelize');

const db = require('../util/database')



const Token = db.define('token', {

    tokenId: {
        allowNull: false,
        primaryKey: true,
        type: Sequalize.UUID,
        defaultValue: () => uuid()
    },
    verifyToken:{
        type: Sequalize.STRING,
        unique: true
    },
    userId:{
        type: Sequalize.UUID,
        references: {
            model: 'user', 
            key: 'id', 
         }
    },
    tokentype:{
        type: Sequalize.STRING
    },
   
})




module.exports =Token;
