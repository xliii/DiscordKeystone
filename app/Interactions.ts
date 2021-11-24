import {Interaction} from "discord.js"
import repositories from "./repository/Repositories";

const keystoneRepository = repositories.keystoneRepository();

function processList(options: any): Promise<any> {
    return keystoneRepository.List().then(keystones => {
        if (keystones.length == 0) {
            return "No keystones available";
        }

        let result = [];
        result.push('All keystones:');
        result.push(...keystones);
        return result;
    });
}

function processResponse(options: any): Promise<any> {
    switch (options.getSubcommand()) {
        case 'list': {
            return processList(options);
        }
        default: {
            return Promise.resolve('Unknown command');
        }
    }
}

module.exports = function (interaction: Interaction): void {
    console.log(interaction);
    if (!interaction.isCommand()) return;

    const {commandName, options} = interaction;

    if (commandName != 'keys') return;

    processResponse(options).then(response => {
        return interaction.reply(response);
    }).then(result => {
        console.log(result);
    })
};
