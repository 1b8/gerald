exports.isPublic = true;

var space = 1, // blocks to space out from the player
    timeout;

exports.run = function (bot, sender, args) {
  if (args.length < 1) return;
  startFollowing(bot, args[0], args[1] === 'in');
};

function startFollowing(bot, name, inFace) {
  walk();

  function walk() {
    var player = require('../util/get-player')(bot, name);
    if (!player) {
      stopFollowing(bot);
      return;
    }

    var entity = player.entity;
    if (!entity) {
      require('../util/consts').cantSee(bot, name)
      stopFollowing(bot);
      return;
    }

    var playerPos = entity.position,
        newPos;

    if (inFace) {
      newPos = playerPos;
    } else {

      newPos = require('mineflayer').vec3();

      forVal('x');
      forVal('z');
      newPos.y = playerPos.y; // TODO Find the y for the x and z instead of this

      function forVal(v) {
        var pla = playerPos[v];
        newPos[v] = bot.entity.position[v] < pla ? pla - space : pla + space;
      }
    }

    bot.navigate.to(newPos);

    timeout = setTimeout(walk, 1000);
  }
}
exports.start = startFollowing;

function stopFollowing(bot) {
  clearTimeout(timeout);
  bot.navigate.stop();
}
exports.stop = stopFollowing;
