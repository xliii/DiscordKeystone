var storage = require('../repository/keystoneStorage');

module.exports = function(args) {
    storage.Clear();
    return "Keystones cleared";
};