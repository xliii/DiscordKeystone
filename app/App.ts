if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

import { Client, Intents} from "discord.js";
import {Scheduler} from "./service/Scheduler";
import RagequitService from "./service/RagequitService";
import ColorService from "./service/ColorService";
import NekoService from "./service/NekoService";

const http = require('http');
const port = process.env.PORT || 3000;

console.log(`Port: ${port}`);
const requestHandler = (request: any, response: any) => {
    console.log(request.url);
    response.end('Hello Keystone Bot!');
};

http.createServer(requestHandler).listen(port);

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

const messageHandler = require("./Message");
const userLeftHandler = require("./handler/UserLeft");

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on("message", message => messageHandler(client, message));
client.on("guildMemberRemove", member => userLeftHandler(client, member));
client.on("error", console.error);
client.on('interactionCreate', async interaction => {
    console.log(interaction);
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    console.log(commandName);
    await interaction.reply(commandName);
});

client.login(process.env.BOT_TOKEN).then(() => {
    client.channels.fetch(process.env.CHANNEL_ID || '').then(channel => {
        if (channel) {

            const scheduler = new Scheduler(channel);
            RagequitService.scheduleRagequitCounter();
            //ColorService.scheduleCleanup(client);
            scheduler.scheduleWeeklyReset();
        }
    });
}).catch(err => {
    console.error("Bot could not login", err);
});