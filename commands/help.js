const Discord = require('discord.js')

const { emoji } = require('../utils/services')

module.exports.run = async (client, msg, args) => {
  let embed = new Discord.MessageEmbed()
	.setColor('#ffeb3b')
	.setTitle('d!roll')
	.setDescription(`${emoji('785952478566023178')} Executa rolagem de dados com apliação`)
	.addFields(
    { name: 'd!roll d12 d6 d6 +4', value: '> Rola d12 + 2d6 +4' },
    { name: 'Resposta: [12, 2, 2]{3} +4: 23', value: '> [rolagens]{ampliações} fixo: resultado final' }
	)

  msg.channel.send(embed)

  embed = new Discord.MessageEmbed()
	.setColor('#43a047')
	.setTitle('d!status')
	.setDescription(`Exibe e/ou altera seu status`)
	.addFields(
    { name: 'd!status', value: '> Apenas exibe seu status atual' },
    { name: 'd!status hp:pool=50', value: '> Cria uma pool com nome "HP" ou altera o tamanho máximo da mesma' },
    { name: 'd!status hp:add=5', value: '> Adiciona 5 pontos na pool "HP", valores negativos subtraem.' },
    { name: 'd!status hp:current=30', value: '> Altera diretamente a quantidade de pontos da pool "HP" para 30' },
    { name: 'd!status mana:add=-20 hp:add=5', value: '> Realiza duas alterações no mesmo comando' },
  )
  
  msg.channel.send(embed)

  embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('d!anel')
	.setDescription(`${emoji('785966543497855027')} Cria anéis espaciais`)
	.addFields(
    { name: 'd!anel 80 d8 d8 +2', value: '> Executa 80 tentativas rolando d8 d8 +2' }
  )
  .setImage('https://github.com/steferson-augusto/discord-bot-dice/blob/master/github/anel.png?raw=true')
  
  msg.channel.send(embed)

  msg.delete()
}