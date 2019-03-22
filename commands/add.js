var keystoneStorage = require('../data/keystoneStorage');
var dungeonStorage = require('../data/dungeonStorage');
var Keystone = require('./../model/keystone');

module.exports = function(args) {
    if (args.length !== 3) {
        return "Usage: **/keys add [character] [dungeon] [key]**";
    }

    var user = args[0];
    var key = args[2];

    var dungeon;
    try {
        dungeon = dungeonStorage.Get(args[1]);
    } catch (e) {
        return e;
    }
    var keystone = new Keystone(dungeon, key);
    keystoneStorage.Add(user, keystone);
    return "**" + keystone + "** added to **" + user + "**";
};