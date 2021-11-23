import {Client, Message} from "discord.js"
import {respond} from "./service/Util";
import CommandProcessor from "./CommandProcessor";
import PizdaService from "./service/PizdaService";
import DaService from "./service/DaService";
import NekoService from "./service/NekoService";

module.exports = function(client:Client, message:Message): void {
    if (message.author.id == process.env.BOT_ID) {
        return
    }

    if (message.guild && message.guild.id !== process.env.GUILD_ID) {
        return
    }

    if (NekoService.matches(message)) {
        NekoService.getNeko().then(neko => respond(message, neko));
        return;
    }

    //TODO: Implement hot feature toggling
    if (PizdaService.matches(message)) {
        respond(message, PizdaService.response(message));
        return
    }

    if (DaService.matches(message)) {
        respond(message, DaService.response(message));
        return
    }

    const parts = message.content.split(' ');
    if (parts[0].toLowerCase() !== "/keys") {
        return
    }

    logInput(message);

    if (parts.length < 2) {
        respond(message, `Please specify command: **${message} [command]**`);
        return;
    }

    const command = parts[1];
    const args = parts.slice(2);

    CommandProcessor.process(command, args, message).then(response => {
        console.log(response.response);
        respond(message, response.response);
        if (response.clearInput) {
            message.delete().catch(err => {
                console.error(err);
            })
        }
    }).catch(error => {
        respond(message, error);
    });
};

function logInput(message: Message) {
    console.log(`${message.author.username} < ${message.content}`);
}