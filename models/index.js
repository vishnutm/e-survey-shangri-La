const User = require('./user');
const Login = require('./login');
const sni = require('./sni');
const Token = require('./token')
const Answers = require('./answer')
const Questions =  require('./question')

User.hasMany(Token,{foreignKey:'userId'});
Token.belongsTo(User,{foreignKey:'userId'});
User.hasMany(Answers,{foreignKey:'userId'});
Answers.belongsTo(User,{foreignKey:'userId'});
Questions.hasMany(Answers,{foreignKey:'id'});
Answers.belongsTo(Questions,{foreignKey:'questionId'});

module.exports = { User, Login, sni,Token,Answers,Questions };