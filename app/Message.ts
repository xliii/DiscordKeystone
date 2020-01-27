import fs = require('fs');
import path = require('path');

import {Client, Message, StringResolvable, TextChannel} from "discord.js"
import {respond, sendMessage} from "./service/Util";
import PizdaService from "./service/PizdaService";
import DaService from "./service/DaService";
import {Command} from "./model/Command";
import Commands from "./Commands";

module.exports = function(client:Client, message:Message): void {
    if (message.author.id == process.env.BOT_ID) {
        return
    }

    // if (message.channel.type === "dm") {
    //     processDM(client, message);
    // }

    if (message.guild && message.guild.id !== process.env.GUILD_ID) {
        return
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

    logInput(message);

    if (parts.length < 2) {
        respond(message, `Please specify command: **${message} [command]**`);
        return;
    }

    const command = parts[1];
    const args = parts.slice(2);

    Commands.process(command, args, message).then(response => {
        respond(message, response);
    }).catch(error => {
        respond(message, error);
    });

    return;
    //
    // commands.forEach(function(cmd) {
    //     console.log(cmd.name() + " -> " + command + ' = ' + cmd.matches(command));
    // });

    fs.readdir(path.join(__dirname, 'command'), function(err, files) {
        if (err) {
            console.error(err);
        }

        let matched = false;
        files.forEach(function(file) {
            console.log(file);
            const commandName = file.split('.')[0];

            console.log(commandName);
            if (commandName != 'Coffee') {
                return;
            }

            import('./command/' + commandName).then(value => {
                let cmd: Command = value.default;
                console.log('import');
                console.log(value);
                console.log(value.default);
                console.log(commandName + " -> " + cmd.name() + " -> " + cmd.matches(command));
            });

            return;

            const handler = require('./command/' + commandName);
            console.log(handler);

            if (command.toUpperCase() === commandName.toUpperCase()) {
                const args:string[] = parts.slice(2);
                Promise.resolve(handler(args, message)).then((response:StringResolvable) => {
                    respond(message, response);
                }).catch(error => {
                    respond(message, error);
                });
                matched = true;
            }

            if (['ADD', 'REMOVE', 'CLEAR'].includes(command.toUpperCase())) {
                message.delete(0).then(result => {
                    console.log(result)
                }).catch(error => {
                    console.error(error)
                })
            }
        });

        if (!matched) {
            let response = `Unknown command: **${message}**`;
            respond(message, response);
        }
    });
};

function logInput(message: Message) {
    console.log(`${message.author.username} < ${message.content}`);
}