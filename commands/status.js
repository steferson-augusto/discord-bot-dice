const Discord = require('discord.js')
const Canvas = require('canvas')

const Status = require('../models/Status')

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

const centerStatusText = (ctx, text) => {
  const width = (700 - 305 - ctx.measureText(text).width) / 2 + 280
  return width
}

const labels = { hp: 'HP', mana: 'Mana', ki: 'Ki' }

const setStatus = {
  pool: async (user, label, value, msg) => {
    try {
      const status = await Status.findOrCreate({
        where: { user, label }, defaults: { max: value, current: value }
      })

      const current = status[0].current > value ? value : status[0].current
      await status[0].update({ max: value, current })
    } catch {
      msg.channel
        .send("```diff\n- Tenha certeza de usar o comando corretamente\nExemplo: d!status hp:pool=100\n```")
    }
  },
  add: async (user, label, value, msg) => {
    try {
      const status = await Status.findOne({ where: { user, label } })

      if (status) {
        let current = 0
        if (value >= 0) {
          current = status.current + value > status.max ? status.max - status.current : value
        } else {
          current = status.current - value <= 0 ? status.current : value
        }

        if ((status.current + value) < (status.max * 0.1)) {
          msg.channel.send("```fix\n- Você vai morrer seu desgraça\n```")
        }

        await status.increment({ current })
        
      } else {
        msg.channel.send("```diff\n- Você não possui esta pool\n```")
      }
    } catch {
      msg.channel
        .send("```diff\n- Tenha certeza de que você possui esta pool ou use o comando corretamente\nExemplo: d!status hp:add=5\n```")
    }
  },
  current: async (user, label, value, msg) => {
    try {
      const status = await Status.findOne({ where: { user, label } })
      const current = value < 0 ? 0 : value > status.max ? status.max : value

      await status.update({ current })
    } catch {
      msg.channel
        .send("```diff\n- Tenha certeza de usar o comando corretamente\nExemplo: d!status hp:current=45\n```")
    }
  }
}

const methodKeys = ['pool', 'add', 'current']

module.exports.run = async (client, msg, args) => {
  const user = msg.author.id

  const promises = args.map(async arg => {
    try {
      const [name, rest] = arg.toLowerCase().split(':')
      const label = labels[name]
      const [method, value] = rest.split('=')

      if (methodKeys.includes(method)) {
        await setStatus[method](user, label, Number(value), msg)
      } else {
        msg.channel.send("```diff\n- Apenas os métodos pool, add e current podem ser usados\n```")
      }
    } catch {
      console.log('errrrrrooou')
    }
  })

  const maxColors = ['#ef5350', '#64b5f6', '#ffb74d', '#aed581', '#9575cd', '#a1887f']
  const currentColors = ['#e57373', '#bbdefb', '#ffe0b2', '#dcedc8', '#d1c4e9', '#d7ccc8']
  
  await Promise.all(promises)

  const values = [
    { user, label: 'HP', max: 50, current: 50 },
    { user, label: 'Mana', max: 50, current: 50 },
    { user, label: 'Ki', max: 50, current: 50 }
  ]

  const statuses = await Status.findAll({ where: { user } })
  
  if (statuses.length === 0) {
    await Status.bulkCreate(values)
  }

  const data = statuses.length > 0 ? statuses : values
  
  const avatarURL = await msg.author.displayAvatarURL({ format: 'jpg' })

  const canvas = Canvas.createCanvas(700, 250)
  const ctx = canvas.getContext('2d')
  const background = await Canvas.loadImage('assets/images/background.png')

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = '#222'

  let size = -15
  data.forEach((value, index) => {
    size += 55
    ctx.font = '18px sans-serif'
    ctx.fillStyle = '#E1E1E6'
    ctx.fillText(value.label, canvas.width / 2.5, size)

    ctx.fillStyle = maxColors[index] || '#bdbdbd'
    roundRect(ctx, 280, size + 10, canvas.width - 305, 20, 8, true)
    ctx.fillStyle = currentColors[index] || '#e0e0e0'
    roundRect(ctx, 280, size + 10, (canvas.width - 305) * value.current / value.max, 20, 8, true, false)
    ctx.font = '16px sans-serif'
    ctx.fillStyle = '#111'
    const text = `${value.current} / ${value.max}`
    ctx.fillText(text, centerStatusText(ctx, text), size + 26)
  })

	ctx.beginPath()
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.clip()
  
  const avatar = await Canvas.loadImage(avatarURL)
  ctx.drawImage(avatar, 25, 25, 200, 200)

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
  
  // msg.delete().catch(() => {})
  msg.channel.send(attachment)
}