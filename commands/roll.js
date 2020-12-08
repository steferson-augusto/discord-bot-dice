
const roll = max => Math.floor(Math.random() * max) + 1

module.exports.run = async (client, msg, args) => {
  let text = ''
  let ampliacao = 0

  const { dices, fix } = args.reduce((result, arg) => {
    if (arg.includes('d')) {
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
  }, { dices: [], fix: 0 })

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

  // msg.delete().catch(() => {})
  msg.channel.send(result)
}