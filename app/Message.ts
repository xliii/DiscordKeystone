import fs = require('fs');

import {Client, DMChannel, Message, StringResolvable, TextChannel} from "discord.js"
import {respond, sendMessage} from "./service/Util";
import PizdaService from "./service/PizdaService";
import DaService from "./service/DaService";

module.exports = function(client:Client, message:Message): void {

    if (message.author.id == process.env.BOT_ID) {
        return
    }

    if (message.channel.type === "dm") {
        processDM(client, message);
    }

    if (PizdaService.matches(message)) {
        sendMessage(message.channel as TextChannel, PizdaService.response(message));
        return
    }

    if (DaService.matches(message)) {
        respond(message, DaService.response(message));
        return
    }

    const parts = message.content.split(' ');
    if (parts[0] !== "/keys") {
        return
    }

    //TODO: Remove later when Dima had enough
    if (message.content.indexOf("coffee") >= 0) {
        respond(message, `NAHUJ IDI`);
        return
    }

    logInput(message);

    if (parts.length < 2) {
        respond(message, `Please specify command: **${message} [command]**`);
        return;
    }

    const command = parts[1];

    fs.readdir('./app/command/', function(err, files) {
        if (err) {
            console.error(err);
        }

        let matched = false;
        files.forEach(function(file) {
            const commandName = file.split('.')[0];
            const handler = require('./command/' + commandName);
            if (command.toUpperCase() === commandName.toUpperCase()) {
                const args:string[] = parts.slice(2);
                Promise.resolve(handler(args, message)).then((response:StringResolvable) => {
                    respond(message, response);
                }).catch(error => {
                    respond(message, error);
                });
                matched = true;
           }
        });

        if (!matched) {
            let response = `Unknown command: **${message}**`;
            respond(message, response);
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