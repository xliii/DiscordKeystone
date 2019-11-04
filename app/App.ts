import Discord = require("discord.js");
import {Scheduler} from "./service/Scheduler";
import {TextChannel} from "discord.js";

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const http = require('http');
const port = process.env.PORT || 3000;

console.log(`Port: ${port}`);
const requestHandler = (request: any, response: any) => {
    console.log(request.url);
    response.end('Hello Keystone Bot!');
};

http.createServer(requestHandler).listen(port);

const client = new Discord.Client();

const messageHandler = require("./Message");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => messageHandler(client, message));
client.on("error", console.error);

client.login(process.env.BOT_TOKEN).then(() => {
    client.user.setPresence({
        game: {
            name: "World Of Warcraft",
            type: "WATCHING"
        },
        status: 'online'
    });

    const channel:TextChannel = client.channels.get(process.env.CHANNEL_ID || '') as TextChannel;
    const scheduler = new Scheduler(channel);
    scheduler.scheduleWeeklyReset();
    //const keystoneTracker = new SavedVariablesTracker(channel, process.env.SAVED_VARIABLES_PATH);
}).catch(err => {
    console.error("Bot could not login", err);
});