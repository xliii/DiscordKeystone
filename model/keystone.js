function Keystone(dungeon, key) {
    this.dungeon = dungeon;
    this.key = key;
}

Keystone.prototype.toString = function() {
    return this.dungeon.name + " " + this.key;
};

module.exports = Keystone;