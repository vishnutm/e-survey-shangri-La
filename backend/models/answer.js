

/**
 * Model to enter Answer
 */
const Sequalize = require('sequelize')
const db = require('../util/database')


const Answers = db.define('answer', {

    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    questionId: {
        type: Sequalize.INTEGER,
        allowNull: false,
        
    },
    optionId: {
        type: Sequalize.INTEGER,
        allowNull: false
    },
    userId:{
        type: Sequalize.INTEGER,
        
        
    }
})



module.exports = Answers;