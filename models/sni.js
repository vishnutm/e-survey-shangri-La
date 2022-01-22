/**
 * Model to enter SNI details
 */
const Sequalize = require('sequelize');

const db = require('../util/database')



const SNIList = db.define('snilist', {

    sniId: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    sniNo: {
        type: Sequalize.STRING,
        allowNull: false,
        unique: true,
    }

})
module.exports = SNIList;