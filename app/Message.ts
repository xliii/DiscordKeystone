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

    logInput(message);

    if (parts.length < 2) {
        sendMessage(message.channel as TextChannel, `Please specify command: **${message} [command]**`);
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
                    sendMessage(message.channel as TextChannel, response);
                }).catch(error => {
                    sendMessage(message.channel as TextChannel, error);
                });
                matched = true;
           }
        });

        if (!matched) {
            let response = `Unknown command: **${message}**`;
            sendMessage(message.channel as TextChannel, response);
        }
    });
};

function processDM(client:Client, message:Message) {
    const dmChannel: DMChannel = message.channel as DMChannel;
    if (dmChannel.recipient.id == process.env.ADMIN) {

        console.log(`${message.author.username} < ${message}`);
        const channel: TextChannel = client.channels.get(process.env.CHANNEL_ID || '') as TextChannel;
        sendMessage(channel, message.content);
    }
}

function logInput(message: Message) {
    console.log(`${message.author.username} < ${message.content}`);
}

function sendMessage(channel: TextChannel, message: StringResolvable) {
    console.log(`${channel.name} > ${message}`);
    channel.send(message);
}