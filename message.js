var fs = require('fs');

module.exports = function(client, message) {
    var parts = message.content.split(' ');
    if (parts[0] !== "/keys") {
        return
    }

    console.log("< " + message);

    if (parts.length < 2) {
        message.channel.send("Please specify command: **" + message + " [command]**");
        return;
    }

    var command = parts[1];

    fs.readdir('./commands/', function(err, files) {
        var matched = false;

        files.forEach(function(file) {
           var handler = require('./commands/' + file);
           var commandName = file.split('.')[0];
           if (command === commandName) {
               var args = parts.slice(2);
               var response = handler(args);
               message.channel.send(response);
               matched = true;
           }
        });

        if (!matched) {
            message.channel.send("Unknown command: **" + message + "**");
        }
    });
};

function matchesCommand(message, command) {
    return matches(message, "/keys " + command);
}

function matches(message, prefix) {
    return message.content.startsWith(prefix);
}