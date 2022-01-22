/**
 * Model to enter Questions
 */
const Sequalize = require('sequelize');

const db = require('../util/database')



const Questions = db.define('question',{
    id:{
        type: Sequalize.INTEGER,
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
    attended:{
        type: Sequalize.BOOLEAN,
        defaultValue: false
    }
    
})
module.exports = Questions;