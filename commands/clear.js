var storage = require('../data/keystoneStorage');

module.exports = function(args) {
    storage.Clear();
    return "Keystones cleared";
};