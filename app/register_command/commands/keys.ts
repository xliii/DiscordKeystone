const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('keys')
    .setDescription('Keystone-bot root command')
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('list')
            .setDescription('List keystones')
    });

console.log(data);

export default data.toJSON();