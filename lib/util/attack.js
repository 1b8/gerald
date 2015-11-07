module.exports = function (bot, target) {
  if (bot.entity.position.distanceTo(target.position) < 5)
    bot.attack(target, true);
};
