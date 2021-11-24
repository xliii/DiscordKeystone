function deleteCommand() {

    require('dotenv').config();

    const {REST} = require('@discordjs/rest');
    const {Routes} = require('discord-api-types/v9');

    const token = process.env.BOT_TOKEN;
    const clientId = '558257059276128257';

    const rest = new REST({version: '9'}).setToken(token);

    rest.get(Routes.applicationCommands(clientId))
        .then((data: any) => {
            console.log(data);
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationCommands(clientId)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
                console.log("Delete: " + command.name);
            }
            return Promise.all(promises);
        });
}

deleteCommand();