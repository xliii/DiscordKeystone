import {StringResolvable, TextChannel} from "discord.js";

export function sendMessage(channel: TextChannel, message: StringResolvable) {
    console.log(`${channel.name} > ${message}`);
    channel.send(message);
}