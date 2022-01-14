const Sequalize = require('sequelize'),
const db = require('../util/database'),

const Answers = db.define('answers',{
id:{
    type:Sequalize.INTEGER,
    unique:true,
    autoIncrement:true,
    allowNull: false,
    primaryKey:true
},
questionId:{
    type:Sequalize.INTEGER
},
answers: {
    type:Sequalize.STRING
},
userId:{
    type:Sequalize.INTEGER
}
})
module.exports = Answers;