const User = require('./user');
const Login = require('./login');
const sni = require('./sni');
const admin = require('./admin');
const Answers = require('./answer')
const Questions =  require('./question')


User.hasMany(Answers,{foreignKey:'userId'});
Answers.belongsTo(User,{foreignKey:'userId'});
Questions.hasMany(Answers,{foreignKey:'id'});
Answers.belongsTo(Questions,{foreignKey:'questionId'});

module.exports = { User, Login, sni,Answers,Questions };