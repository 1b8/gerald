exports.isPublic = true;

exports.run = function (bot) {
  require('./time').stop();
  require('./attack').stop(bot);
  require('./rampage').stop();
}
