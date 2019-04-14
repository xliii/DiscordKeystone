import fs = require('fs');

import {Client, DMChannel, Message, StringResolvable, TextChannel} from "discord.js"

module.exports = function(client:Client, message:Message): void {

    if (message.channel.type === "dm") {
        processDM(client, message);
    }

    const parts = message.content.split(' ');
    if (parts[0] !== "/keys") {
        return
    }

    console.log(`< ${message}`);

    if (parts.length < 2) {
        message.channel.send(`Please specify command: **${message} [command]**`);
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
                Promise.resolve(handler(args, message)).then((response:StringResolvable) => {
                    console.log(`> ${response}`);
                    message.channel.send(response);
                });
                matched = true;
           }
        });

        if (!matched) {
            let response = `Unknown command: **${message}**`;
            console.log(`> ${response}`);
            message.channel.send(response);
        }
    });
};

function processDM(client:Client, message:Message) {
    const dmChannel: DMChannel = message.channel as DMChannel;
    if (dmChannel.recipient.id == process.env.ADMIN) {

        console.log(`${dmChannel.recipient.username} < ${message}`);
        const channel:TextChannel = client.channels.get(process.env.CHANNEL_ID || '') as TextChannel;
        channel.send(message.content);
        console.log(`${channel.name} > ${message}`);
    }
}