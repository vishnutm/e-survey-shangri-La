const Sequalize = require('sequelize')

const sequelize = new Sequalize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: 5431,
  dialect: 'postgres',
  logging: true,
})



module.exports = sequelize
