const roll = dices => {
  const value = dices.reduce((total, dice) => {
    if (dice.includes('d')) {
      const [num, face] = dice.split('d')
      const quantity = Number(num) || 1
      const max = Number(face)
      if (max <= 1) return total += 1

      for (let index = 0; index < quantity; index++) {
        let rolagem = Number(max)
        while (rolagem === max) {
          console.log(`d${max}`)
          rolagem = Math.floor(Math.random() * max) + 1
          total += rolagem
        }
      }
      
    } else total += Number(dice)

    return total
  }, 0)

  return value
}

module.exports = roll