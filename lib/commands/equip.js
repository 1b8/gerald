exports.isPublic = true;

exports.run = function (bot, sender, args) {
  // Using window.items() would not get armour slots
  var items = bot.inventory.slots,
      best = {},
      item, type;

  for (var i = 0; i < items.length; i++) {
    item = items[i];
    if (!item) continue;

    type = require('../../data/equipment.json')[item.name];
    if (!type) continue; // if it's not equipment

    if (!best[type.slot] || type.power > best[type.slot].power)
      best[type.slot] = {
        power: type.power,
        item: item
      };
  }

  var keys = Object.keys(best);
  i = 0;

  eachKey();
  function eachKey() {
    if (i < keys.length) {
      var key = keys[i];
      bot.equip(best[key].item, key, eachKey);
      i++;
    }
  }
};
