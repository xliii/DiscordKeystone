import fs = require('fs');

import {Client, Message} from "discord.js"

module.exports = function(client:Client, message:Message): void {
    const parts = message.content.split(' ');
    if (parts[0] !== "/keys") {
        return
    }

    console.log("< " + message);

    if (parts.length < 2) {
        message.channel.send("Please specify command: **" + message + " [command]**");
        return;
    }

    const command = parts[1];

    fs.readdir('./app/command/', function(err, files) {
        let matched = false;
        files.forEach(function(file) {
            const commandName = file.split('.')[0];
            const handler = require('./command/' + commandName);
            if (command.toUpperCase() === commandName.toUpperCase()) {
                const args:string[] = parts.slice(2);
                const response:any = handler(args);
                message.channel.send(response);
                matched = true;
           }
        });

        if (!matched) {
            message.channel.send("Unknown command: **" + message + "**");
        }
    });
};