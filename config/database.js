const Sequalize = require('sequelize')


const sequelize = new Sequalize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: 5432,
  dialect: 'postgres',
  logging: true
})

module.exports = sequelize
