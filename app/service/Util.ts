import {Client, DMChannel, Message, StringResolvable, TextChannel} from "discord.js";

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

export function processDM(client:Client, message:Message) {
    const dmChannel: DMChannel = message.channel as DMChannel;
    if (dmChannel.recipient.id == process.env.ADMIN) {

        console.log(`${message.author.username} < ${message}`);
        const channel: TextChannel = client.channels.get(process.env.CHANNEL_ID || '') as TextChannel;
        sendMessage(channel, message.content);
    }
}