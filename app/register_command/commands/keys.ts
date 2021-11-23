const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('keys')
    .setDescription('Keys test command update')
    .toJSON();

export default data;