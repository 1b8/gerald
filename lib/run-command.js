module.exports = function (bot, config) {
  var commands = require('./commands'),
      is = require('./util/is'),
      regex, vanilla = false;

  switch (config.styles.chat) {

    // Chat pattern variants
    case 'vanilla': vanilla = true; break;
    case 'colon': regex = /^(.+): (.+)$/; break;

    default: regex = new RegExp(config.styles.chat);
  }

  if (!vanilla) bot.chatAddPattern(regex, 'chat');
  vanilla = false;

  switch (config.styles.tell) {

    // /tell pattern variants
    case 'vanilla': vanilla = true; break;
    case 'essentials': regex = /^\[ (.+)-> me \] (.+)$/; break;

    default: regex = new RegExp(config.styles.tell);
  }

  if (!vanilla) bot.chatAddPattern(regex, 'whisper');

  // Debug
  bot.on('message', function (msg) {
    console.log('"'+msg+'"');
  });
  // End debug

  bot.on('chat', function (name, msg) {
    var match = msg.match(new RegExp('^(?:gerald|bot|' + bot.username + ')[,!?] (.+)', 'i'));
    if (!match) return;
    execute(name, match[1]);
  })
  .on('whisper', execute);

  function execute(name, msg) {
    if (name === (config.nick || bot.username)) return;

    // If the message ends with a '.', '?', or '!', chop it off.
    switch(msg[msg.length - 1]) {
      case '.':
      case '?':
      case '!':
        msg = msg.substr(0, msg.length - 1);
    }

    var all = msg.split(' '),
        cmd = commands[all[0].toLowerCase()];
    if (!cmd) return;

    var args = all.slice(1);

    if (!is.scum(name) && (cmd.isPublic || is.master(name))) {
      console.log("Executing command '" + msg + "'");

      if (cmd.run) cmd.run(bot, name, args);

      if (cmd.subcommands && args[0]) {
        var subcmd = cmd.subcommands[args[0].toLowerCase()];
        if (!subcmd) return;

        subcmd(bot, name, args.slice(1));
      }
    } else {
      bot.chat("I don't take orders from you, fool.");
    }
  }
};
