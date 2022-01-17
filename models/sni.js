const Sequalize = require('sequelize');

const db = require('../util/database');

var SNIList = sequelize.define('snilist',{
    sniId:{
        type:Sequalize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    sniNo:{
        type: Sequelize.STRING,
        unique: true
    },
    status:{
      type: Sequelize.Boolean,
      default: false
    }
   
})
module.exports ={SNIList};