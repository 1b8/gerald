module.exports = function (bot, targetName) {
  if (!targetName) return;
  for (var name in bot.players)
    if (name.match(new RegExp(targetName, 'i')))
      return bot.players[name];
  // auto-return undefined
};
