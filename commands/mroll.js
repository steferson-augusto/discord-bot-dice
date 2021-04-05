const Discord = require('discord.js')
const roll = require('../utils/roll')
const { getChannel, isChannel } = require('../utils/services')

module.exports.run = async (client, msg, args) => {
  const quantidade = Number(args.shift()) || 1
  const dificuldade = Number(args.shift())

  if (quantidade < 1) {
    const message = await msg.channel.send('```diff\n-A quantidade mínima é 1```')
    setTimeout(() => {
      msg.delete()
      message.delete()
    }, 5000)
    return
  }

  if (dificuldade < 2) {
    const message = await msg.channel.send('```diff\n-A dificuldade mínima é 2```')
    setTimeout(() => {
      msg.delete()
      message.delete()
    }, 5000)
    return
  }

  let acertos = 0
  for (let index = 0; index < quantidade; index++) {
    const rolagem = roll(args)
    if (rolagem >= dificuldade) {
      acertos = acertos + 1
    }
  }

  const label = args.reduce((final, arg) => `${final} ${arg}`, '')
  const name = msg.author.username
  const avatarUrl = await msg.author.displayAvatarURL({ format: 'jpg' })

  const embed = new Discord.MessageEmbed()
  .setAuthor(name, avatarUrl)
  .setTitle('Multi Roll')
  .addField('Tentativas', quantidade, true)
  .addField('Dificuldade', dificuldade, true)
  .addField('Dados', label, false)
  .addField('Acertos', acertos, true)

  if (isChannel('681342318334443569')) {
    msg.channel.send(embed)
  } else {
    const channel = getChannel('681342318334443569')
    channel.send(embed)
    const message = await msg.channel.send('```diff\n- Corno, rolagem de dados é no outro canal\n- Vai ter que ver o resultado lá para largar de ser besta\n```')
    setTimeout(() => {
      message.delete()
    }, 5000)
  }

  msg.delete()
}