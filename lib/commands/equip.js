// NOTE WIP

exports.isPublic = true;

var equipment = {
  weapons: {
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
  },

  helms: {
    298: 1,
    314: 2,
    302: 3,
    306: 4,
    310: 5
  },
  chests: {
    299: 1,
    315: 2,
    303: 3,
    307: 4,
    311: 5
  },
  legs: {
    300: 1,
    316: 2,
    304: 3,
    308: 4,
    312: 5
  },
  boots: {
    301: 1,
    317: 2,
    305: 3,
    309: 4,
    313: 5
  }
};

exports.run = function (bot, sender, args) {
  var items = bot.inventory.items();

  if (args[0] === 'hand') {

    var hand = items[bot.quickBarSlot],
        type = hand.type;

    function equip(dest) {
      bot.equip(hand, dest);
    }

    // type is a number, id is a string

    for (var id in equipment.helms) {
      if (type == id) {
        equip('head');
        return;
      }
    }
    for (id in equipment.chests) {
      if (type == id) {
        equip('torso');
        return;
      }
    }
    for (id in equipment.legs) {
      if (type == id) {
        equip('legs');
        return;
      }
    }
    for (id in equipment.boots) {
      if (type == id) {
        equip('feet');
        return;
      }
    }
  }

  itemLoop:
  for (var i = 0; i < items.length; i++) {
    var id = items[i].type;

    for (var weapon in equipment.weapons) {
      if (id === weapon && equipment.weapons[weapon] > bot.inventory) {
        continue itemLoop;
      }
    }

    for (var helm in equipment.helms) {

    }
    for (var chest in equipment.chests) {

    }
    for (var legs in equipment.legs) {

    }
    for (var boots in equipment.boots) {

    }
  }
}
