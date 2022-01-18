


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
    answers:{
        type: Sequalize.JSONB,
        allowNull: false
    },
    userId:{
        type: Sequalize.INTEGER,
        
        
    }
})



module.exports = Answers;