const Status = require('../models/Status')
const StatusMessage = require('../models/StatusMessage')
const { getValues, createImage, updateStatus } = require('../utils/status')

module.exports.run = async (client, msg, args) => {
  const user = msg.author.id

  const hasPermission = msg.member.roles.cache.has('784934956454772756')
  if (hasPermission) {
    await updateStatus(msg, args, user)

    const values = getValues(user)
    const statuses = await Status.findAll({ where: { user } })
    
    if (statuses.length === 0) {
      await Status.bulkCreate(values)
    }

    const data = statuses.length > 0 ? statuses : values
    const avatarURL = await msg.author.displayAvatarURL({ format: 'jpg' })

    const attachment = await createImage(data, avatarURL)
    
    // msg.delete().catch(() => {})
    msg.channel.send(attachment)

    if (args.length > 0) {
      const channel = msg.guild.channels.cache.get('784837970905006120')
      const { id: message } = await channel.send(attachment)
      StatusMessage.create({ user, message }, { channel })
    }
  } else {
    msg.channel.send('```diff\n- Você precisa do cargo "Player" para usar este comando.\n```')
  }
}