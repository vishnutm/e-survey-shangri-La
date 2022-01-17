const Sequalize = require('sequelize');

const db = require('../util/database');

var Token = sequelize.define('token',{
    tokenId:{
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuid()
    },
    verifyToken:{
        type: Sequelize.STRING,
        unique: true
    },
    userId:{
        type: Sequelize.UUID,
        references: {
            model: 'user', 
            key: 'id', 
         }
    },
    tokentype:{
        type: Sequelize.STRING
    }
})
module.exports ={Token};
