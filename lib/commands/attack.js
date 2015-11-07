exports.isPublic = false;

var consts = require('../util/consts'),
    follow = require('./follow'),
    interval;

exports.run = function (bot, sender, args) {
  var name = args[0];

  if (!name) return;
  if (bot.username.toLowerCase() === name.toLowerCase()) {
    bot.chat('Very funny.');
    return;
  }

  bot.chat(consts.DESTROY_MSG);

  follow.start(bot, name);
  interval = setInterval(function () {
    var player = require('../util/get-player')(bot, name);
    if (!player) {
      stopAttack(bot);
      return;
    }
    // TODO clearInterval if player not online (or out of sight?)

    var entity = player.entity;
    if (!entity) {
      consts.cantSee(bot, player.username);
      stopAttack(bot);
      return;
    }

    require('../util/attack')(bot, entity);

  }, consts.ATTACK_SPEED);

  setTimeout(function () {
    stopAttack();
    bot.chat('Stopping attack...');
  }, args[1] ? require('./time').time(args.slice(1)) : consts.DEFAULT_TIME);
};

function stopAttack(bot) {
  clearInterval(interval);
  follow.stop(bot);
}
exports.stop = stopAttack;
