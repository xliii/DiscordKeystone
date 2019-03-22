function Entry(user, keystone) {
    this.user = user;
    this.keystone = keystone;
}

Entry.prototype.toString = function() {
    return "**" + this.user + "**: " + this.keystone;
};

module.exports = Entry;