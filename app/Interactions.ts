import {Interaction} from "discord.js"

const processAlias = require("./modules/Alias");
const processGeneral = require("./modules/General");

function processResponse(interaction: any): Promise<any> {
    const options = interaction.options;
    const group = options.getSubcommandGroup(false);
    const command = options.getSubcommand();
    console.log("Group: " + group);
    console.log("Command: " + command);
    switch (group) {
        case 'alias': {
            return processAlias(interaction);
        }
        default: {
            return processGeneral(interaction);
        }
    }
}

module.exports = function (interaction: Interaction): void {
    if (!interaction.isCommand()) return;

    const {commandName, options, user} = interaction;

    if (commandName != 'keys') return;

    processResponse(interaction).then(response => {
        return interaction.reply(response);
    }).then(result => {
        console.log(result);
    })
};
