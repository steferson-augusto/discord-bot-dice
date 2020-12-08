const Discord = require('discord.js')

const roll = max => Math.floor(Math.random() * max) + 1

module.exports.run = async (client, msg, args) => {
  let text = ''
  let ampliacao = 0

  const { dices, fix, label } = args.reduce((result, arg) => {
    if (arg.includes('d')) {
      result.label += ` ${arg}`
      const [num, face] = arg.split('d')
      const quantity = Number(num) || 1
      for (let index = 0; index < quantity; index++) {
        result.dices.push(Number(face) || 1)
      }
    } else {
      const fix = Number(arg) || 0
      result.fix += fix
    }

    return result
  }, { dices: [], fix: 0, label: '' })

  const value = dices.reduce((sum, max) => {
    if (max <= 1) return sum += 1
    let dice = roll(max)
    sum += dice
    text = `${text}, ${dice}`
    
    while (dice === max) {
      dice = roll(max)
      ampliacao += dice
      sum += dice
    }
    return sum
  }, 0)

  const textFix = fix > 0 ? ` +${fix}` : fix < 0 ? ` -${fix}` : ''

  text = text.substring(2)
  const result = `[${text}]${ampliacao > 0 ? `{${ampliacao}}` : ''}${textFix}: ${value}`

  const name = msg.author.username
  const avatarUrl = await msg.author.displayAvatarURL({ format: 'jpg' })

  const embed = new Discord.MessageEmbed()
  .setAuthor(name, avatarUrl)
  .setTitle(`${label}${textFix}`)
	.setDescription(result)

  msg.channel.send(embed)

  msg.delete()
}