const { check } = require('../utils/services')
const Alias = require('../models/Alias')

module.exports.run = async (client, msg, args) => {
  try {
    const [user, label] = args
    const validMember = await check(user, ['master', 'member'])
    if (validMember) {
      if (label.toLowerCase() !== 'show') {
        await Alias.create({ user, label })
      }
      const aliases = await Alias.findAll({ where: { user }})
      const texto = aliases.reduce((final, alias) => `${final}\n${alias.label}`, '')
      msg.channel.send('```css' + texto + '\n```')
      msg.delete()
    }
  } catch(err) {
    msg.channel
      .send('```diff\n- Houve um problema, tenha certeza de que este alias não foi usado anteriormente.\n```')
    msg.delete()
  }
  
}