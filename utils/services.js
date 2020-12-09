let msg = null

const setMessage = message => msg = message

const isMaster = () => msg.member.roles.cache.has('785276366610104371')

const isPlayer = () => msg.member.roles.cache.has('784934956454772756')

const isMember = async user => {
  try {
    await msg.guild.members.fetch(user)
    return true
  } catch {
    return false
  }
}

const check = async (user, roles) => {
  const validate = {
    master: {
      value: isMaster(msg),
      error: '```diff\n- É necessário o cargo "Mestre" para executar este comando.\n```'
    },
    player: {
      value: isPlayer(msg),
      error: '```diff\n- É necessário o cargo "Player" para executar este comando.\n```'
    },
    member: {
      value: await isMember(msg, user),
      error: '```diff\n- O usuário informado não é válido.\n```'
    }
  }

  const valid = roles.every(role => {
    const { value, error } = validate[role]
    if (!value) msg.channel.send(error)
    return value || false
  })
  return valid
}

const getChannel = id => msg.guild.channels.cache.get(id)

const isChannel = id => msg.channel.id === id

const emoji = id => msg.guild.emojis.cache.get(id).toString()

const getMemberAvatarURL = async id => {
  const member = await msg.guild.members.fetch(id)
  const avatarURL = await member.user.displayAvatarURL({ format: 'jpg' })
  return avatarURL
}

module.exports = {
  isMaster, isPlayer, isMember, check, emoji, getChannel, isChannel, getMemberAvatarURL, setMessage
}