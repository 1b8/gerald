// NOTE WIP

exports.isPublic = true;

/*
    // Tools
    // Iron
    256: 3,
    257: 4,
    258: 5,
    // Wood
    269: 1,
    270: 2,
    271: 3,
    // Stone
    273: 2,
    274: 3,
    275: 4,
    // Diamond
    277: 4,
    278: 5,
    279: 6,
    // Gold
    284: 1,
    285: 2,
    286: 3,

    // Swords
    267: 6,
    268: 4,
    272: 5,
    276: 7,
    283: 4
*/

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
