const Sequelize = require('sequelize')

const dbConfig = require('../config/database')
const Status = require('../models/Status')
const StatusMessage = require('../models/StatusMessage')

const connection = new Sequelize(dbConfig)

Status.init(connection)
StatusMessage.init(connection)

module.exports = connection