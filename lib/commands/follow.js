exports.isPublic = true;

var interval;

exports.run = function (bot, sender, args) {
  if (args.length < 1) return;
  startFollowing(bot, args[0]);
};

function startFollowing(bot, name) {
  interval = setInterval(function () {
    var player = require('../util/get-player')(bot, name);
    if (!player) {
      stopFollowing(bot);
      return;
    }

    var entity = player.entity;
    if (!entity) {
      // TODO Why does it spam this?
      require('../util/consts').cantSee(bot, name);
      stopFollowing(bot);
      return;
    }

    bot.navigate.to(entity.position);
  }, 2000);
};
exports.start = startFollowing;

function stopFollowing(bot) {
  clearInterval(interval);
  bot.navigate.stop();
};
exports.stop = stopFollowing;