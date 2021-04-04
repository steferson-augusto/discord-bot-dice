const Discord = require('discord.js')
const roll = require('../utils/roll')
const { getChannel, isChannel } = require('../utils/services')

module.exports.run = async (client, msg, args) => {
  // colocar de modo educativo
  const dificuldade = Number(args.shift())
  const quantidade = Number(args.shift()) || 1

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
  .setTitle(`d!mroll ${label}`)
  .addField('Tentativas', quantidade, true)
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