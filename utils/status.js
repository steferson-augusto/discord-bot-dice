const Canvas = require('canvas')
const Discord = require('discord.js')
const { darken } = require('polished')

const Status = require('../models/Status')

const methodKeys = ['pool', 'add', 'current', 'color']

const capitalize = text => {
  try {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`
  } catch {
    return ''
  }
}

const verifyColor = color => {
  if (!color.startsWith('#')) return false
  if (color.length !== 7) return false
  return true
}

const setStatus = {
  pool: async (user, label, newValue, msg) => {
    try {
      const value = Number(newValue)
      const status = await Status.findOrCreate({
        where: { user, label }, defaults: {
          user,
          label: capitalize(label),
          max: value,
          current: value
        },
        lock: false
      })

      const current = status[0].current > value ? value : status[0].current
      await status[0].update({ max: value, current }, { lock: false })
    } catch (err) {
      console.log(err)
      msg.channel
        .send('```diff\n- Tenha certeza de usar o comando corretamente\nExemplo: d!status hp:pool=100\n```')
    }
  },
  add: async (user, label, newValue, msg) => {
    try {
      const value = Number(newValue)
      const status = await Status.findOne({ where: { user, label } })

      if (status) {
        let current = 0
        if (value >= 0) {
          current = status.current + value > status.max ? status.max - status.current : value
        } else {
          current = status.current - value <= 0 ? status.current : value
        }

        if ((status.current + value) < (status.max * 0.1)) {
          msg.channel.send('```fix\n- Você vai morrer seu desgraça\n```')
        }

        await status.increment({ current })
        
      } else {
        msg.channel.send('```diff\n- Você não possui esta pool\n```')
      }
    } catch {
      msg.channel
        .send('```diff\n- Tenha certeza de que você possui esta pool ou use o comando corretamente\nExemplo: d!status hp:add=5\n```')
    }
  },
  current: async (user, label, newValue, msg) => {
    try {
      const value = Number(newValue)
      const status = await Status.findOne({ where: { user, label } })
      const current = value < 0 ? 0 : value > status.max ? status.max : value

      await status.update({ current })
    } catch {
      msg.channel
        .send('```diff\n- Tenha certeza de usar o comando corretamente\nExemplo: d!status hp:current=45\n```')
    }
  },
  color: async (user, label, value, msg) => {
    try {
      if (verifyColor(value)) {
        const status = await Status.findOne({ where: { user, label } })
        await status.update({ color: value })
      } else {
        msg.channel.send('```diff\n- Tenha certeza de usar uma cor hexadecimal válida.\n```')
      }
    } catch (error) {
      console.log(error)
      msg.channel
        .send('```diff\n- Tenha certeza de usar o comando corretamente\nExemplo: d!status hp:color=#dcedc8\n```')
    }
  }
}

const updateStatus = async (msg, args, user) => {
  const promises = args.map(async arg => {
    try {
      const [name, rest] = arg.toLowerCase().split(':')
      const label = name.toUpperCase().replace('_', ' ')
      const [method, value] = rest.split('=')

      if (methodKeys.includes(method)) {
        await setStatus[method](user, label, value, msg)
      } else {
        msg.channel.send("```diff\n- Apenas os métodos pool, add e current podem ser usados\n```")
      }
    } catch {
      console.log('Ocorreu um erro ao alterar status')
    }
  })
  
  if (promises.length > 0) {
    await Promise.all(promises)
  }
} 

const colors = {
  max: ['#ef5350', '#8bc34a', '#42a5f5', '#ffca28', '#9575cd', '#ff5722'],
  current: ['#e57373', '#dcedc8', '#bbdefb', '#ffecb3', '#d1c4e9', '#ffab91'],
}

const roundRect = (ctx, x, y, width, height, radius, fill, stroke) => {
  if (typeof stroke === 'undefined') {
    stroke = true
  }
  if (typeof radius === 'undefined') {
    radius = 5
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius}
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0}
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side]
    }
  }
  
  ctx.beginPath()
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)
  ctx.closePath()

  if (fill) {
    ctx.fill()
  }
  if (stroke) {
    ctx.stroke()
  }
}

const centerStatusText = (ctx, text) => {
  const width = (600 - 160 - ctx.measureText(text).width) / 2 + 140
  return width
}

const getValues = user => [
  { user, label: 'HP', max: 50, current: 50 },
  { user, label: 'Mana', max: 50, current: 50 },
  { user, label: 'Ki', max: 50, current: 50 }
]

const createImage = async (data, avatarURL) => {
  let height = data.length * 30 + 30
  if (height < 140) height = 140
  const canvas = Canvas.createCanvas(600, height)
  const ctx = canvas.getContext('2d')

  ctx.beginPath()
  ctx.rect(0, 0, 600, height)
  ctx.fillStyle = '#323232'
  ctx.fill()

  ctx.strokeStyle = '#222'

  let positionTop = -20
  data.forEach((value, index) => {
    positionTop += 30
    ctx.fillStyle = value.color ? darken(0.2, value.color) : (colors.max[index] || '#bdbdbd')
    roundRect(ctx, 140, positionTop + 10, canvas.width - 160, 20, 8, true)
    ctx.fillStyle = value.color || colors.current[index] || '#e0e0e0'
    roundRect(ctx, 140, positionTop + 10, (canvas.width - 160) * value.current / value.max, 20, 8, true, false)
    ctx.font = '16px sans-serif'
    ctx.fillStyle = '#111'
    const text = `${value.label}  ${value.current} / ${value.max}`
    ctx.fillText(text, centerStatusText(ctx, text), positionTop + 26)
  })

  ctx.beginPath()
  ctx.arc(70, 70, 50, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()
  
  const avatar = await Canvas.loadImage(avatarURL)
  ctx.drawImage(avatar, 20, 20, 100, 100)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'status.png')

  return attachment
}

const checkUser = async (msg, user) => {
  try {
    await msg.guild.members.fetch(user)
    return true
  } catch {
    return false
  }
}

module.exports = {
  updateStatus, getValues, createImage, checkUser
}