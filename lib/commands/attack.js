exports.isPublic = false;

var consts = require('../util/consts'),
    follow = require('./follow'),
    timeout;

exports.run = function (bot, sender, args) {
  var name = args[0];

  follow.start(bot, name);
  attack();

  function attack() {
    var player = require('../util/get-player')(bot, name);

    if (player === bot.players[bot.username]) {
      bot.chat('Very funny.');
      stopAttack(bot);
      return;
    }

    if (!player) {
      stopAttack(bot);
      return;
    }

    var entity = player.entity;
    if (!entity) {
      consts.cantSee(bot, player.username);
      stopAttack(bot);
      return;
    }

    require('../util/attack')(bot, entity);

    timeout = setTimeout(attack, consts.ATTACK_SPEED);

  }

  setTimeout(function () {
    stopAttack();
    bot.chat('Stopping attack...');
  }, args[1] ? require('./time').time(args.slice(1)) : consts.DEFAULT_TIME);
};

function stopAttack(bot) {
  clearTimeout(timeout);
  follow.stop(bot);
}
exports.stop = stopAttack;
