var dungeons = require('../repository/dungeonStorage').List();

module.exports = function(args) {
    return "Available dungeons: \n" + dungeons
        .map(function(dungeon) {
            return "● " + dungeon;
        })
        .join('\n');
};