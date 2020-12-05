module.exports = {
  dialect: 'sqlite',
  storage: './discord_bot.sqlite',
  define: {
    timestamps: false,
    undescored: true
  }
}