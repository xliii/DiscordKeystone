import repositories from "../repository/Repositories";
import {camelcase} from "../service/Util";
import {Alias} from "../model/Alias";

const aliasRepo = repositories.aliasRepository();

function extractAlias(user: any): Promise<string> {
    const discordId: string = user.id;
    const discordName: string = user.username;
    return aliasRepo.Get(discordId)
        .then(alias => alias.character)
        .catch(() => {
            throw `No alias found for **${discordName}**`
        });
}

function list(options: any, user: any): Promise<any> {
    return aliasRepo.List().then(aliases => {
        return aliases.length > 0 ?
            aliases.join('\n') :
            "No aliases available";
    });
}

function set(options: any, user: any): Promise<any> {
    const discordId: string = user.id;
    const discordName: string = user.username;
    const character = camelcase(options.getString('character'));

    return aliasRepo.Add(new Alias(discordName, discordId, character)).then(() => {
        return `Alias **${character}** added for **${discordName}**`;
    });
}

function get(options: any, user: any): Promise<any> {
    return extractAlias(user).then(character => {
        return `**${user.username}**'s alias is **${character}**`;
    }).catch(error => error);
}

function remove(options: any, user: any): Promise<any> {
    const discordId: string = user.id;
    const discordName: string = user.username;
    return aliasRepo.Remove(discordId).then(alias => {
        return alias ?
            `Alias **${alias.character}** removed from **${discordName}**` :
            `No alias found for **${discordName}**`;
    })
}

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'list':
            return list(options, user);
        case 'get':
            return get(options, user);
        case 'set':
            return set(options, user);
        case 'remove':
            return remove(options, user);
        default:
            return Promise.resolve('Unknown command');
    }
};