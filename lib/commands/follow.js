exports.isPublic = true;

var timeout;

exports.run = function (bot, sender, args) {
  if (args.length < 1) return;
  startFollowing(bot, args[0]);
};

function startFollowing(bot, name) {
  walk();

  function walk() {
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

    timeout = setTimeout(walk, 2000);
  }
};
exports.start = startFollowing;

function stopFollowing(bot) {
  clearTimeout(timeout);
  bot.navigate.stop();
};
exports.stop = stopFollowing;
