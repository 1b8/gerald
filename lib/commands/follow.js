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

    forVal('x');
    forVal('z');

    function forVal(v) {
      var pla = playerPos[v];
      newPos[v] = bot.entity.position[v] < pla ? pla - space : pla + space;
    }

    // Find y for x and z; only going 4 up/down max.
    console.log('s');
    for (var i = 0; i < 5; i++) {
      if (check(-i) || check(i)) break;
    }

    function check(y) {
      console.log('y =', playerPos.y + y);
      console.log('below =', box(y-1), 'd =', box(y), 'then', box(y+1));
      if (box(y-1) === 'block' && box(y) === 'empty' && box(y+1) === 'empty') {
        console.log('Hello');
        newPos.y = playerPos.y + y;
        return true;
      }
    }

    function box(y) {
      console.log('loc =', newPos.offset(0, playerPos.y + y, 0));
      return bot.blockAt(newPos.offset(0, playerPos.y + y, 0)).boundingBox;
    }

console.log('new', newPos);
    bot.navigate.to(newPos);
    // navigateTo is synchronous; may take a while to finish
    timeout = setTimeout(walk, 2000);
  }
}
exports.start = startFollowing;

function stopFollowing(bot) {
  clearTimeout(timeout);
  bot.navigate.stop();
}
exports.stop = stopFollowing;
