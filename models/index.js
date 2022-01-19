const User = require('./user');
const Login = require('./login');
const sni = require('./sni');

const Answers = require('./answer')
const Questions =  require('./question');
const Options = require('./options');

Questions.hasMany(Options, {foreignKey: 'questionId'});
Options.belongsTo(Questions, {foreignKey: 'questionId'});
User.hasMany(Answers, {foreignKey:'userId'});
Answers.belongsTo(User, {foreignKey:'userId'});
Questions.hasMany(Answers, {foreignKey:'id'});
Answers.belongsTo(Questions, {foreignKey:'questionId'});

module.exports = { User, Login, sni, Answers, Questions, Options};