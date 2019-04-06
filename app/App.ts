import Discord = require("discord.js");
import {Scheduler} from "./service/Scheduler";
import {TextChannel} from "discord.js";

const client = new Discord.Client();
require("dotenv").config();

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
}).catch(err => {
    console.error("Bot could not login", err);
});