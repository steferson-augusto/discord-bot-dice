const { Model, DataTypes } = require('sequelize')

class StatusMessage extends Model {
  static init(sequelize) {
    super.init({
      user: DataTypes.STRING,
      message: DataTypes.STRING,
    }, {
      hooks: {
        beforeCreate: async (values, { channel }) => {
          const olds = await this.findAll({ where: { user: values.user } })
          olds.map(async old => {
            const message = await channel.messages.fetch(old.message)
            message.delete()
            old.destroy()
          })
        }
      },
      sequelize, tableName: 'status_messages'
    })
  }
}

module.exports = StatusMessage