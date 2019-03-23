var keystones = require('../repository/keystoneStorage');

module.exports = function(args) {
    if (args.length !== 1) {
        return "Usage: **/keys remove [character]**";
    }

    var user = args[0];
    var keystone = keystones.Remove(user);
    return keystone ?
        "**" + keystone + "** removed from **" + user + "**" :
        "No keystone found for **" + user + "**";
};