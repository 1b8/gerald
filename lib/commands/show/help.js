module.exports = function (bot) {
  var cmds = require('../'),
      keys = Object.keys(cmds),
      i = 0;

  function showLine() {
    if (i < keys.length) {
      var cmd = keys[i];
      bot.chat((cmds[cmd].isPublic ? 'public' : 'master') + ' - ' + cmd);
      i++;
      setTimeout(showLine, 250);
    }
  }
  showLine();
}
