var word;

module.exports = function (bot, sender, args) {
  word = args[0];
  bot.chat('Time to play Hang-man...');
  bot.on('chat', onChat);
};

function onChat(name, msg) {

}
