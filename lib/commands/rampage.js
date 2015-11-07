exports.isPublic = false;

var consts = require('../util/consts'),
    interval;

exports.run = function (bot, sender, args) {
  bot.chat(consts.DESTROY_MSG);

  interval = setInterval(function () {

    var keys = Object.keys(bot.entities),
        target = bot.entities[keys[~~(Math.random() * keys.length)]];

    if (target !== bot.entity) require('../util/attack')(bot, target)

  }, consts.ATTACK_SPEED);

  setTimeout(function () {
    stopRampage();
    bot.chat('Rampage over...');
  }, args[0] ? require('./time').toMillis(args) : require('../util/consts').DEFAULT_TIME);
};

function stopRampage() {
  clearInterval(interval);
};
exports.stop = stopRampage;
