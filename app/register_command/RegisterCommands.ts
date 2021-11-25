function registerCommand() {
    require("dotenv").config();

    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    const path = require("path");
    const _TOKEN = process.env.BOT_TOKEN;
    const fs = require('fs');

    const commands = [];
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter((file: any) => file.endsWith('.js'));

// Place your client and guild ids here
    const clientId = '558257059276128257';
    const guildId = '493732138169008129';

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        console.log(command);
        commands.push(command.default);
    }

    const rest = new REST({ version: '9' }).setToken(_TOKEN);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
}

registerCommand();