import {Interaction} from "discord.js"
import repositories from "./repository/Repositories";
import {Keystone} from "./model/Keystone";
import {KeystoneEntry} from "./model/KeystoneEntry";
import {Character} from "./model/Character";

const aliasRepo = repositories.aliasRepository();
const keystoneRepo = repositories.keystoneRepository();
const dungeonRepo = repositories.dungeonRepository();

function processAliasList(options: any, user: any): Promise<any> {
    return aliasRepo.List().then(aliases => {
        return aliases.length > 0 ?
            aliases.join('\n') :
            "No aliases available";
    });
}

function processAdd(options: any, user: any): Promise<any> {
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

function processList(options: any, user: any): Promise<any> {
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

function processResponse(options: any, user: any): Promise<any> {
    const group = options.getSubcommandGroup(false);
    const command = options.getSubcommand();
    console.log("Group: " + group);
    console.log("Command: " + command);
    switch (group) {
        case 'alias': {
            switch (command) {
                case 'list':
                    return processAliasList(options, user);
                default:
                    return Promise.resolve('Unknown command');
            }
        }
        default: {
            switch (command) {
                case 'list':
                    return processList(options, user);
                case 'add':
                    return processAdd(options, user);
                default:
                    return Promise.resolve('Unknown command');
            }
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
