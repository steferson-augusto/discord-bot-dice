const Sequelize = require('sequelize')

const dbConfig = require('../config/database')
const Status = require('../models/Status')

const connection = new Sequelize(dbConfig)

Status.init(connection)

module.exports = connection