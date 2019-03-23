var storage = require('../repository/keystoneStorage');

module.exports = function(args) {
    var keystones = storage.List();
    return keystones.length > 0 ?
        keystones :
        "No keystones available";
};