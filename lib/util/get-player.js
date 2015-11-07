module.exports = function (bot, targetName) {
  // TODO Add auto-complete
  for (var name in bot.players)
    if (name.toLowerCase() === targetName.toLowerCase())
      return bot.players[name];
  // Automatically returns undefined
};
