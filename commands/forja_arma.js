const Discord = require('discord.js')
const roll = require('../utils/roll')

module.exports.run = async (client, msg, args) => {
  const dices = args

  const quantity = Number(dices.shift())
  const grade = Number(dices.shift())
  const weight = Number(dices.shift())
  const relativeTime = Number(dices.shift()) || 0

  const minTime = grade * (120 + (15 * grade * 1.1 * (weight - 1)))
  const percent = relativeTime < 0 ? 1 - (relativeTime * 0.1) : relativeTime > 0 ? 1 + (relativeTime * 0.25) : 1
  const difficulty = ((grade * 15)  + (weight + (grade * 0.15 * minTime / 60))) * percent

  let success = 0
  for (let i = 0; i < quantity; i++) {
    const value = roll(dices)
    if (value > difficulty) success++
  }
  

  const embed = new Discord.MessageEmbed()
	.setColor('#FFFA99')
	.setTitle('Forja de armas')
	// .setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/eeuZhZy.png')
	.addField('Tentativas', quantity, true)
	.addField('Grau', grade, true)
	.addField('Peso', weight, true)
	.addField('Dados', dices.join(' '), false)
	.addField('Dificuldade', difficulty, true)
	.addField('Bônus', `${percent * 100}%`, true)
	.addField('\u200B', '\u200B', false)
	.addField('Acertos', success, false)
	.setTimestamp()
  msg.channel.send(embed)
}