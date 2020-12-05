const { Model, DataTypes } = require('sequelize')

class Status extends Model {
  static init(sequelize) {
    super.init({
      user: DataTypes.STRING,
      label: DataTypes.STRING,
      max: DataTypes.INTEGER,
      current: DataTypes.INTEGER
    }, {
      sequelize, 
    })
  }
}

module.exports = Status