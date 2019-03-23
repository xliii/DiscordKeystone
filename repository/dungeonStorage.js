var Dungeon = require('./../model/dungeon');

function DungeonStorage() {
    var PATH = "./storage/dungeons.json";
    var fs = require("fs");

    this.List = function() {
        return JSON.parse(fs.readFileSync(PATH, "utf8"))
            .map(function(dungeon) {
                return new Dungeon(dungeon.name, dungeon.aliases)
            });
    };

    this.Get = function(name) {
        var filtered = this.List().filter(function(dungeon) {
            return dungeon.name === name || dungeon.aliases.includes(name);
        });

        if (!filtered || !filtered.length) {
            throw "Dungeon not found";
        }
        return filtered[0];
    }
}

module.exports = new DungeonStorage();