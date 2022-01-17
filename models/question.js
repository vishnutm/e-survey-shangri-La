const Sequalize = require('sequelize');

const db = require('../util/database')



const Questions = db.define('question',{
    id:{
        type: Sequalize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
    },
    question:{
        type:Sequalize.STRING,
        unique: true,
        allowNull:false
    },
    options:{
        type: Sequalize.JSONB,
        allowNull: false
    },
    count:{
        type: Sequalize.INTEGER,
        allowNull:true
    },
    userId:{
        type: Sequalize.INTEGER,
        
    }
})
module.exports = Questions;