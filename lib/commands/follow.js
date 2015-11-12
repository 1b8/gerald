exports.isPublic = true;

var space = 1, // blocks to space out from the player
    timeout;

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
      require('../util/consts').cantSee(bot, name)
      stopFollowing(bot);
      return;
    }

    var playerPos = entity.position,
        newPos = require('mineflayer').vec3();

    // start

    forVal('x');
    forVal('z');

    function forVal(v) {
      var pla = playerPos[v];
      newPos[v] = bot.entity.position[v] < pla ? pla - space : pla + space;
    }

    // Find y for x and z; only going 4 up/down max.
    for (var i = 0; i < 5; i++) {
      if (solidBelow(-i) || solidBelow(i)) break;
    }

    function solidBelow(y) {
      var box = bot.blockAt(playerPos.offset(0, y - 1, 0));
console.log('box', box.boundingBox);
console.log('nam', box.name);
      if (box.boundingBox === 'block') {
console.log('Right!');
        newPos.y = y;
        return true;
      }
    }

console.log('new', newPos);
    bot.navigate.to(newPos);
    // navigateTo is synchronous; may take a while to finish
    timeout = setTimeout(walk, 250);
  }
}
exports.start = startFollowing;

function stopFollowing(bot) {
  clearTimeout(timeout);
  bot.navigate.stop();
}
exports.stop = stopFollowing;
