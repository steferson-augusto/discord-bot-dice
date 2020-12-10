const Status = require('../models/Status')
const StatusMessage = require('../models/StatusMessage')
const { getValues, createImage, updateStatus } = require('../utils/status')
const {
  isMaster,
  isMember,
  isPlayer,
  getChannel,
  getMemberAvatarURL,
  getUsersMention,
} = require('../utils/services')

module.exports.run = async (client, msg, args) => {  
  const master = isMaster()
  const player = isPlayer()
  const users = master ? await getUsersMention() : [msg.author.id]

  users.forEach(async user => {
    const member = await isMember(user)
    const hasPermission = player || master

    if (!member) {
      msg.channel.send('```diff\n- Escolha um Player válido\n```')
    }
    else if (hasPermission) {
      await updateStatus(msg, args, user)

      const values = getValues(user)
      const statuses = await Status.findAll({ where: { user } })
      
      if (statuses.length === 0) {
        await Status.bulkCreate(values)
      }

      const data = statuses.length > 0 ? statuses : values
      // const avatarURL = await msg.author.displayAvatarURL({ format: 'jpg' })
      const avatarURL = await getMemberAvatarURL(user)

      const attachment = await createImage(data, avatarURL)
      
      // msg.delete().catch(() => {})
      msg.channel.send(attachment)

      if (args.length > 0) {
        const channel = getChannel('784837970905006120')
        const { id: message } = await channel.send(attachment)
        StatusMessage.create({ user, message }, { channel })
      }
    } else {
      msg.channel.send('```diff\n- Você precisa do cargo "Player" ou "Mestre" para usar este comando.\n```')
    }
  })
}