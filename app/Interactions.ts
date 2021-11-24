import {Interaction} from "discord.js"
import repositories from "./repository/Repositories";
import {Keystone} from "./model/Keystone";
import {KeystoneEntry} from "./model/KeystoneEntry";
import {Character} from "./model/Character";

const aliasRepo = repositories.aliasRepository();
const keystoneRepo = repositories.keystoneRepository();
const dungeonRepo = repositories.dungeonRepository();


function processAdd(options: any, user: any): Promise<any> {
    const dungeon = options.getString('dungeon');
    const level = options.getInteger('level');
    const userId = user.id;

    return aliasRepo.Get(userId).then(alias => {
        return addKeystone(alias.character, dungeon, level);
    });
}

function addKeystone(character:string, dungeonName:string, key:number): Promise<any> {
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

        let result = [];
        result.push('All keystones:');
        result.push(...keystones);
        return result;
    });
}

function processResponse(options: any, user: any): Promise<any> {
    switch (options.getSubcommand()) {
        case 'list': {
            return processList(options, user);
        }
        case 'add': {
            return processAdd(options, user);
        }
        default: {
            return Promise.resolve('Unknown command');
        }
    }
}

module.exports = function (interaction: Interaction): void {
    console.log(interaction);
    if (!interaction.isCommand()) return;

    const {commandName, options, user} = interaction;

    if (commandName != 'keys') return;

    processResponse(options, user).then(response => {
        return interaction.reply(response);
    }).then(result => {
        console.log(result);
    })
};
