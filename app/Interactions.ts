import {Interaction} from "discord.js"

module.exports = function (interaction: Interaction): void {
    console.log(interaction);
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    console.log(commandName);
    interaction.reply(commandName).then(result => {
        console.log(result);
    })
};
