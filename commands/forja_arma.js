const Discord = require('discord.js')
const roll = require('../utils/roll')

module.exports.run = async (client, msg, args) => {
  const dices = args

  const quantity = Number(dices.shift()) || 1
  const grade = Number(dices.shift()) || 1
  const weight = Number(dices.shift()) || 1
  const relativeTime = Number(dices.shift()) || 0

  const minTime = grade * (120 + (15 * grade * 1.1 * (weight - 1)))
  const percent = relativeTime < 0 ? 1 - (relativeTime * 0.1) : relativeTime > 0 ? 1 + (relativeTime * 0.25) : 1
  const difficulty = ((grade * 15)  + (weight + (grade * 0.15 * minTime / 60))) * percent

  let success = 0
  for (let i = 0; i < quantity; i++) {
    const value = roll(dices)
    if (value > difficulty) success++
  }
  
  const name = msg.author.username
  const avatarUrl = await msg.author.displayAvatarURL({ format: 'jpg' })
  const embed = new Discord.MessageEmbed()
  .setAuthor(name, avatarUrl)
	.setColor('#FFFA99')
	.setTitle('Forja de armas')
	.setThumbnail('https://i.imgur.com/eeuZhZy.png')
	.addField('Tentativas', quantity, true)
	.addField('Grau', grade, true)
	.addField('Peso', weight, true)
	.addField('Dados', dices.join(' '), false)
	.addField('Dificuldade extra', `${percent * 100 - 100}%`, true)
	.addField('Dificuldade', difficulty, true)
	.addField('Acertos', success, false)
	.setTimestamp()
  msg.channel.send(embed)
}