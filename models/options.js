
/**
 * Model to enter Options
 */

const Sequalize = require('sequelize')
const db = require('../util/database')

const Options = db.define('option', {

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
    answerText: {
        type: Sequalize.TEXT,
        allowNull: false
    }
})



module.exports = Options;