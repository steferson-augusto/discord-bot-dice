const Sequelize = require('sequelize')

const dbConfig = require('../config/database')
const Status = require('../models/Status')
const Alias = require('../models/Alias')
const StatusMessage = require('../models/StatusMessage')

const connection = new Sequelize(dbConfig)

Status.init(connection)
StatusMessage.init(connection)
Alias.init(connection)

module.exports = connection