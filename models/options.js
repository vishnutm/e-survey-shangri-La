const Sequalize = require('sequelize');

const db = require('../util/database')

const Options = db.define('options',{
    id:{
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
    },
    questionId:{
        type: Sequalize.INTEGER,
        allowNull:false
    },
    answerText:{
        type: Sequalize.STRING
    }
})
module.exports = Options;