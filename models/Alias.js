const { Model, DataTypes } = require('sequelize')

class Alias extends Model {  
  static init(sequelize) {
    super.init({
      user: DataTypes.STRING,
      label: DataTypes.STRING,
    }, {
      sequelize, tableName: 'aliases'
    })
  }
}

module.exports = Alias