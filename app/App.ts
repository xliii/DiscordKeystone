import Discord = require("discord.js");
const client = new Discord.Client();

const messageHandler = require("./Message");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", message => messageHandler(client, message));

client.login("NTU4MjU3MDU5Mjc2MTI4MjU3.D3UM_A.2LYCAw7KdqjLf2oX-xXsvOtRKek").then(value => {
    console.log(value);
}).catch(err => {
    console.error(err);
});
