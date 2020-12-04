const roll = dados => {
  const value = dados.reduce((total, dado) => {
    const prefixo = dado.substring(0, 1)
    if (prefixo.toLowerCase() === 'd') {
      const max = Number(dado.substring(1, dado.length))
      let rolagem = Number(max)
      while (rolagem === max) {
        rolagem = Math.floor(Math.random() * max) + 1
        total += rolagem
      }
    } else {
      total += Number(dado)
    }

    return total
  }, 0)

  return value
}

module.exports = roll