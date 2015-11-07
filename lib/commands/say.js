exports.isPublic = false;

exports.run = function (bot, sender, args) {
  var msg = args.join(' ');
  bot.chat(msg);

  if (msg[0] === '/') {
    bot.once('message', function (json) {
      bot.chat(json.toString());
    });
  }
};
