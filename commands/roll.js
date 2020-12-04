
const roll = max => Math.floor(Math.random() * max) + 1

module.exports.run = async (client, msg, args) => {
  let text = ''
  let ampliacao = 0
  fix = 0
  const value = args.reduce((sum, cur) => {
    const prefix = cur.substring(0, 1)
    const max = Number(cur.substring(1, cur.length))
    if (prefix.toLowerCase() == 'd' ) {
      let dice = 0
      let cont = 0
      while (cont >= 0) {
        dice = roll(max)
        if (cont == 0) text = `${text}, ${dice}`
        else ampliacao += dice
        sum += dice
        cont = dice == max ? cont + 1 : -1
      }
    } else {
      const num = Number(cur) || 0
      sum += num
      fix += num 
    }
    return sum
  }, 0)

  const textFix = fix >= 0 ? ` +${fix}` : ` ${fix}`

  text = text.substring(2)
  const result = `[${text}]${ampliacao > 0 ? `{${ampliacao}}` : ''}${textFix}: ${value}`

  // msg.delete().catch(() => {})
  msg.channel.send(result)
}