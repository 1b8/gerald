module.exports = {
  // In milliseconds
  ATTACK_SPEED: 250,
  // 10 minutes, for rampage and attack
  DEFAULT_TIME: 36000000,

  DESTROY_MSG: 'DESTROY DESTROY DESTROY',

  // Messages
  cantSee: function (bot, name) {
    bot.chat("I can't see " + name + '!');
  },
  invalidPlayer: function (bot, name) {
    bot.chat("Player '" + name + "' not found!");
  }
};
