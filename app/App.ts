import Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

const messageHandler = require("./Message");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => messageHandler(client, message));
client.on("error", console.error);

client.login(process.env.BOT_TOKEN).then(() => {
    console.log("Bot started");
}).catch(err => {
    console.error("Bot could not login", err);
});
