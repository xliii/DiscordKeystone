import {Keystone} from "../model/Keystone";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Character} from "../model/Character";
import repositories from "../repository/Repositories";
import {camelcase} from "../service/Util";

const aliasRepo = repositories.aliasRepository();
const keystoneRepo = repositories.keystoneRepository();
const dungeonRepo = repositories.dungeonRepository();

function add(options: any, user: any): Promise<any> {
    const dungeon = options.getString('dungeon');
    const level = options.getInteger('level');
    const userId = user.id;

    return aliasRepo.Get(userId).then(alias => {
        return addKeystone(alias.character, dungeon, level);
    });
}

function addKeystone(character: string, dungeonName: string, key: number): Promise<any> {
    return dungeonRepo.GetByName(dungeonName).then(dungeon => {
        const keystone: Keystone = new Keystone(dungeon, key);
        const entry: KeystoneEntry = new KeystoneEntry(new Character(character), keystone, new Date().getTime());
        return keystoneRepo.Add(entry).then(() => {
            return `**${keystone}** added to **${character}**`;
        });
    });
}

function remove(options: any, user: any): Promise<any> {
    let character: string = camelcase(options.getString('character'));

    return keystoneRepo.Remove(character).then(keystone => {
        return keystone ?
            `**${keystone.keystone}** removed from **${character}**` :
            `No keystone found for **${character}**`;
    });
}

function clear(options: any, user: any): Promise<any> {
    return keystoneRepo.Clear().then(() => {
        return "Keystones cleared";
    });
}

function list(options: any, user: any): Promise<any> {
    return keystoneRepo.List().then(keystones => {
        if (keystones.length == 0) {
            return "No keystones available";
        }

        let result = "";
        result += 'All keystones:';
        keystones.forEach(keystone => {
            result += ('\n' + keystone)
        });
        console.log(result);
        return result;
    });
}

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'remove':
            return remove(options, user);
        case 'clear':
            return clear(options, user);
        case 'list':
            return list(options, user);
        case 'add':
            return add(options, user);
        default:
            return Promise.resolve('Unknown command');
    }
};