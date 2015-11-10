exports.isPublic = true;

var timeout;

exports.run = function (bot, sender, args) {
  timeout = setTimeout(function () {
    bot.chat('Time up!');
  }, toMillis(args));
};

exports.stop = function () {
  clearTimeout(timeout);
}

function toMillis(arr) {
  var millis = 0;

  for (var i = 0; i < arr.length; i++) {
    var match = arr[i].match(/(\d+)(\w+)/);
    if (!match) continue;

    t = Number(match[1]);
    if (isNaN(t)) continue;

    var unit = 1;

    switch (match[2]) {
      // Hours
      case 'h':
        unit = 3600000;
        break;
      // Minutes
      case 'm':
      case 'min':
        unit = 60000;
        break;
      // Seconds
      case 's':
      case 'sec':
        unit = 1000;
    }

    millis += t * unit;
  }

  return millis;
}
exports.toMillis = toMillis;
