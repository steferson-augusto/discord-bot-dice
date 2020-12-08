const Status = require('../models/Status')
const StatusMessage = require('../models/StatusMessage')
const Alias = require('../models/Alias')
const { getValues, createImage, updateStatus } = require('../utils/status')
const { isMaster, isMember, isPlayer } = require('../utils/services')

module.exports.run = async (client, msg, args) => {
  let user = msg.author.id
  
  const master = isMaster(msg)
  if (master) {
    const userId = args.shift()
    const alias = await Alias.findOne({ where: { label: userId } })
    user = alias.user || userId
  }

  const member = await isMember(msg, user)
  const hasPermission = isPlayer(msg) || master

  if (!member) {
    msg.channel.send('```diff\n- Digite o alias/id do player corretamente.\n```')
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
    const member = await msg.guild.members.fetch(user)
    const avatarURL = await member.user.displayAvatarURL({ format: 'jpg' })

    const attachment = await createImage(data, avatarURL)
    
    // msg.delete().catch(() => {})
    msg.channel.send(attachment)

    if (args.length > 0) {
      const channel = msg.guild.channels.cache.get('784837970905006120')
      const { id: message } = await channel.send(attachment)
      StatusMessage.create({ user, message }, { channel })
    }
  } else {
    msg.channel.send('```diff\n- Você precisa do cargo "Player" ou "Mestre" para usar este comando.\n```')
  }
}