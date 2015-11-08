module.exports = function (bot, targetName) {
  for (var name in bot.players)
    if (name.match(targetName))
      return bot.players[name];
  // Automatically returns undefined
};
