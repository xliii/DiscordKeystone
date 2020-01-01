import {Keystone} from "../model/Keystone";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Message, StringResolvable} from "discord.js";
import {Character} from "../model/Character";

import repositories from "../repository/Repositories";
import {camelcase} from "../service/Util";
const aliasRepo = repositories.aliasRepository();
const keystoneRepo = repositories.keystoneRepository();
const dungeonRepo = repositories.dungeonRepository();

module.exports = function(args: string[], message:Message): Promise<StringResolvable> {

    const usage = Promise.resolve("Usage: **/keys add {character} [dungeon] [key]**");

    if (args.length < 2) {
        return usage;
    }

    switch (args.length) {
        case 2: return addAlias(args, message);
        case 3: return addExplicit(args);
        default: return usage;
    }

    function addAlias(args: string[], message: Message): Promise<StringResolvable> {
        const dungeonName: string = args[0];
        const key: number = parseInt(args[1]);
        const discordId: string = message.author.id;

        return aliasRepo.Get(discordId).then(alias => {
            return addKeystone(alias.character, dungeonName, key);
        });
    }

    function addExplicit(args: string[]): Promise<StringResolvable> {
        const character: string = camelcase(args[0]);
        const dungeonName: string = args[1];
        const key: number = parseInt(args[2]);
        return addKeystone(character, dungeonName, key);
    }
    
    function addKeystone(character:string, dungeonName:string, key:number): Promise<StringResolvable> {
        return dungeonRepo.GetByName(dungeonName).then(dungeon => {
            const keystone: Keystone = new Keystone(dungeon, key);
            const entry: KeystoneEntry = new KeystoneEntry(new Character(character), keystone, new Date().getTime());
            return keystoneRepo.Add(entry).then(() => {
                return `**${keystone}** added to **${character}**`;
            });
        });
    }
};