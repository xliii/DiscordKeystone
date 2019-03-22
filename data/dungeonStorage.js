var Dungeon = require('./../model/dungeon');

function DungeonStorage() {
    this.List = function() {
        return [
            new Dungeon("Atal'Dazar", ["AD"]),
            new Dungeon("Freehold", ["FH"]),
            new Dungeon("Kings Rest", ["KR"]),
            new Dungeon("Motherlode", ["ML", "Mother"]),
            new Dungeon("Shrine of the Storm", ["SOTS", "Shrine"]),
            new Dungeon("Siege of Boralus", ["SOB", "Siege", "Boralus"]),
            new Dungeon("Temple of Sethraliss", ["TOS", "Temple", "Sethraliss"]),
            new Dungeon("Tol Dagor", ["TD", "Dagor"]),
            new Dungeon("Underrot", ["UR"]),
            new Dungeon("Waycrest Manor", ["WM", "Waycrest", "Manor"])
        ];
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