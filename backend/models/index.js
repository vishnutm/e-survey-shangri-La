const User = require('./user');
const Login = require('./login');
const sni = require('./sni');
const Admin = require('./admin');
const Answers = require('./answer')
const Questions =  require('./question');
const Options = require('./options');

const sequelize = require('../util/database')

Questions.hasMany(Options, {foreignKey: 'questionId', onDelete: 'cascade'})
Options.belongsTo(Questions, {foreignKey: 'questionId'})
Options.hasMany(Answers, {foreignKey: 'optionId'})
Answers.belongsTo(Options, {foreignKey: 'optionId'})
User.hasMany(Answers,{foreignKey:'userId'});
Answers.belongsTo(User,{foreignKey:'userId'});
Questions.hasMany(Answers, {foreignKey:'id'});
Answers.belongsTo(Questions,{foreignKey:'questionId'});
//Login.belongsTo(User,{foreignKey:'userId'});

module.exports = { User, Login, sni, Answers, Questions, Options, sequelize,Admin};
