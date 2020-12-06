const Status = require('../models/Status')
const StatusMessage = require('../models/StatusMessage')
const { getValues, createImage, updateStatus, checkUser } = require('../utils/status')

module.exports.run = async (client, msg, args) => {
  let user = msg.author.id
  
  const isMaster = msg.member.roles.cache.has('785276366610104371')
  if (isMaster) user = args.shift() || 'null'

  const isMember = await checkUser(msg, user)
  const hasPermission = msg.member.roles.cache.has('784934956454772756') || isMaster

  if (!isMember) {
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