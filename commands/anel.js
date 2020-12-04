const Discord = require('discord.js')
const roll = require('../utils/roll')

module.exports.run = async (client, msg, args) => {
  const dados = args

  const dificuldades = [
  {
    dado: 9,
    resultado: '100%',
    quantidade: 0
  },
  {
    dado: 8,
    resultado: '80%',
    quantidade: 0
  },
  {
    dado: 7,
    resultado: '60%',
    quantidade: 0
  },
  {
    dado: 6,
    resultado: '50%',
    quantidade: 0
  },
  {
    dado: 5,
    resultado: '30%',
    quantidade: 0
  },
  {
    dado: 0,
    resultado: 'Falha',
    quantidade: 0
  }
]
  
  const quantidade = Number(dados.shift())
  
  for (let i = 0; i < quantidade; i++) {
    const rolagem = roll(dados)
    
    dificuldades.some(dificuldade => {
      if (rolagem >= dificuldade.dado) {
        dificuldade.quantidade += 1
        return true
      }
      return false
    })
  }
  
  const falhas = dificuldades.pop()
  const resultado = dificuldades
    .filter(dificuldade => dificuldade.quantidade > 0)
    .map(({ resultado, quantidade }) => ({
      name: resultado,
      value: quantidade,
      inline: true
    }))

  const embed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Forja de anéis espaciais')
	// .setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/nH9YiBt.png')
	.addFields(
		{ name: 'Custo', value: quantidade * 575 },
		{ name: '\u200B', value: '\u200B' },
		...resultado
	)
	.addField('Falhas', falhas.quantidade, true)
	.setTimestamp()
	// .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
  // msg.delete().catch(() => {})
  msg.channel.send(embed)
}