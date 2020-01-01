import {Message, StringResolvable, TextChannel} from "discord.js";

export function sendMessage(channel: TextChannel, message: StringResolvable) {
    console.log(`${channel.name} > ${message}`);
    channel.send(message);
}

export function respond(message: Message, response: StringResolvable) {
    sendMessage(message.channel as TextChannel, response);
}

export function camelcase(str: string) {
    return str.toLowerCase().replace(/^\w/, c => c.toUpperCase());
}