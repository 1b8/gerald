module.exports = function (bot, sender, args) {
  var word = args[0];
  bot.chat('Time to play Hang-man...');

  bot.on('chat', onChat);
};

function onChat(name, msg) {
  if (require('../../util/is').scum(name)) return;
}
