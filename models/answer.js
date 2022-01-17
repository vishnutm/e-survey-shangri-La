


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
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
    },
    answers: {
        type: Sequalize.STRING,

    },

})



module.exports = { Answers };