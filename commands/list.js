var storage = require('../data/keystoneStorage');

module.exports = function(args) {
    var keystones = storage.List();
    return keystones.length > 0 ?
        keystones :
        "No keystones available";
};