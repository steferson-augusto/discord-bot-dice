const express = require('express')
const Discord = require("discord.js")

require('dotenv').config()

const app = express()

app.get("/", (request, response) => {
  const ping = new Date()
  ping.setHours(ping.getHours() - 3)
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
  response.sendStatus(200)
})

app.listen(process.env.PORT)

const client = new Discord.Client()
const config = require("./config.json")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
    
client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.channel.type == 'dm') return;
  if (!msg.content.toLowerCase().startsWith(config.prefix)) return;
  if (msg.content.startsWith(`<@!${client.user.id}>`) || msg.content.startsWith(`<@${client.user.id}>`)) return;

  const args = msg.content
    .trim().slice(config.prefix.length)
    .split(' ')

  const command = args.shift().toLowerCase()

  try {
    const commandFile = require(`./commands/${command}.js`)
    commandFile.run(client, msg, args)
  } catch (error) {
    console.error(error)
  }
})

client.login(process.env.TOKEN)