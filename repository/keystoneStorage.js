var Entry = require('./../model/entry');
var Keystone = require('./../model/keystone');

function KeystoneStorage() {
    var PATH = "./storage/keystones.json";
    var fs = require("fs");

    this.List = function() {
        var keystones = read();
        var result = [];
        Object.keys(keystones).forEach(function (user) {
            result.push(new Entry(user, toKeystone(keystones[user])));
        });
        return result;
    };

    this.Clear = function() {
        write("{}");
    };

    this.Add = function(user, keystone) {
        var keystones = read();
        keystones[user] = keystone;
        write(keystones);
    };


    this.Get = function(user) {
        var keystones = read();
        return keystones[user] ? toKeystone(keystones[user]) : null;
    };

    this.Remove = function(user) {
        var keystones = read();
        var keystone = this.Get(user);
        if (keystone) {
            delete keystones[user];
            write(keystones);
        }
        return keystone;
    };

    var write = function(obj) {
        var data = obj != null ? JSON.stringify(obj, null, 2) : '{}';
        fs.writeFile(PATH, data, "utf8", callback);
    };

    var read = function() {
        return JSON.parse(fs.readFileSync(PATH, "utf8"));
    };

    var callback = function(err) {
        if (err) {
            console.error("Failed writing keystones");
        }
    };

    var toKeystone = function(keystone) {
        return new Keystone(keystone.dungeon, keystone.key);
    }
}

module.exports = new KeystoneStorage();