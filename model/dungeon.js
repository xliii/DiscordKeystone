function Dungeon(name, aliases) {
    this.name = name;
    this.aliases = aliases;
}

Dungeon.prototype.toString = function() {
    return "**" + this.name + "** (" + this.aliases.join(', ') + ")";
};

module.exports = Dungeon;