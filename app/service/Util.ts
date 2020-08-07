import {Client, DMChannel, Message, StringResolvable, TextChannel} from "discord.js";

export function sendMessage(channel: TextChannel, message: StringResolvable) {
    console.log(`${channel.name} > ${message}`);
    channel.send(message);
}

export function announce(client: Client, message: StringResolvable) {
    const channel: TextChannel = client.channels.get(process.env.CHANNEL_ID || '') as TextChannel;
    sendMessage(channel, message);
}

export function respond(message: Message, response: StringResolvable) {
    sendMessage(message.channel as TextChannel, response);
}

export function camelcase(str: string) {
    return str.split(' ').map(v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join(' ');
}

export function processDM(client:Client, message:Message) {
    const dmChannel: DMChannel = message.channel as DMChannel;
    if (dmChannel.recipient.id == process.env.ADMIN) {

        console.log(`${message.author.username} < ${message}`);
        announce(client, message.content);
    }
}