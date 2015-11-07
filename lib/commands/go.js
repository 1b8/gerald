exports.isPublic = true;

var consts = require('../util/consts'),
    walking = true;

exports.run = function (bot, sender, args) {
  var name = args[1],
      player = require('../util/get-player')(bot, name);

  if (!player) {
    consts.invalidPlayer(bot, name);
    return;
  }

  var entity = player.entity;
  if (!entity) {
    consts.cantSee(bot, name);
    return;
  }

  bot.navigate.to(entity.position);

  // If we don't do something, ./attack will spam...
  bot.navigate.once('arrived', onArrival)
  .once('cannotFind', onCannotFind);

  function onArrival() {
    bot.chat("I'm here!");
    this.removeListener('cannotFind', onCannotFind);
  }

  function onCannotFind() {
    this.walk(closest, function () {
      bot.chat("I'm stuck...");
    });
    this.removeListener('arrived', onArrival);
  }
};
