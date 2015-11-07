var args = process.argv.slice(2);

if (args.length < 1) {
  // [host:port] <TODO [master]> [username|email] [password] [chat type]
  console.log('Usage: node gerald.js [server] [username|email] [password]');
  process.exit();
}

var mineflayer = require('mineflayer'),
    config = require('./config.json')[args[0]],

    bot = mineflayer.createBot({
  // node-minecraft-protocol sets defaults
  host: config.host,
  port: config.port,
  username: args[1] || 'Minion',
  password: args[2]
})

.once('spawn', function () {
  console.log('Connected! Press CTRL-C to disconnect.');
  bot.chat('Hello, I am a robot!');
})

.on('death', function () {
  bot.chat('/back');
})

.on('end', function () {
  console.log('Disconnected.');
  process.exit();
})

.on('kicked', function (reason) {
  console.log('Kicked:', reason);
  process.exit();
});

require('./lib/util/is').setUp(config);

// Set up commands
require('./lib/run-command')(bot, config);

// Set up mineflayer-navigate

require('mineflayer-navigate')(mineflayer)(bot);
