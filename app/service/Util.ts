import {Client, DMChannel, Message, TextChannel, Channel, TextBasedChannels} from "discord.js";

export function sendMessage(channel: TextBasedChannels | Channel, message: any) {
    const textChannel: TextChannel = channel as TextChannel;
    console.log(`${textChannel} > ${message}`);

    // @ts-ignore
    textChannel.send(message);
}

export function announce(client: Client, message: any) {
    client.channels.fetch(process.env.CHANNEL_ID || '').then(channel => {
        if (!channel) {
            return;
        }
        sendMessage(channel as unknown as TextBasedChannels, message);
    });
}

export function respond(message: Message, response: any) {
    sendMessage(message.channel, response);
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