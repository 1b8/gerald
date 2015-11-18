exports.isPublic = true;

try {
  var keys = require('../../keys');
  var ChatBot = require('cleverbot.io');
  var chatBot = new ChatBot(keys.chat.user, keys.chat.key);
  var chattingTo;

  exports.run = function (bot, sender, args) {
    stopChat(bot);
    chattingTo = sender;
    chatBot.setNick(sender);

    chatBot.create(function () {
      bot.on('chat', onChat);
    });
  };

  function onChat(name, msg) {
    if (name !== chattingTo) return;
    if (msg === 'end') {
      stopChat(this);
      return;
    }

    var bot = this;
    chatBot.ask(msg, function (err, response) {
      bot.chat(response);
    });
  }

  function stopChat(bot) {
    bot.removeListener('chat', onChat);
  }
  exports.stop = stopChat;

} catch (err) {
  var noKeyMsg = 'You have not added your cleverbot.io API user/key in the `keys.json`! Please refer to your `README.md` (in the Installation section)!';
  console.log(noKeyMsg);
  exports.run = function (bot) {bot.chat(noKeyMsg);};
  exports.stop = function () {};
}
