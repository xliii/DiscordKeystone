import {Interaction} from "discord.js"

const processKeystones = require("./modules/Keystones");
const processAlias = require("./modules/Alias");

function processResponse(options: any, user: any): Promise<any> {
    const group = options.getSubcommandGroup(false);
    const command = options.getSubcommand();
    console.log("Group: " + group);
    console.log("Command: " + command);
    switch (group) {
        case 'alias': {
            return processAlias(options, user);
        }
        default: {
            return processKeystones(options, user);
        }
    }
}

module.exports = function (interaction: Interaction): void {
    console.log(interaction);
    if (!interaction.isCommand()) return;

    const {commandName, options, user} = interaction;

    if (commandName != 'keys') return;

    processResponse(options, user).then(response => {
        console.log(response);
        return interaction.reply(response);
    }).then(result => {
        console.log(result);
    })
};
