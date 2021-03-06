import {Keystone} from "../model/Keystone";
import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Message, StringResolvable} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {Character} from "../model/Character";

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

        const aliasRepo = new AliasFileRepository();
        return aliasRepo.Get(discordId).then(alias => {
            return addKeystone(alias.character, dungeonName, key);
        });
    }

    function addExplicit(args: string[]): Promise<StringResolvable> {
        const character: string = args[0];
        const dungeonName: string = args[1];
        const key: number = parseInt(args[2]);
        return addKeystone(character, dungeonName, key);
    }
    
    function addKeystone(character:string, dungeonName:string, key:number): Promise<StringResolvable> {
        const dungeonRepo = new DungeonFileRepository();
        const entryRepo = new KeystoneEntryFileRepository();
        return dungeonRepo.GetByName(dungeonName).then(dungeon => {
            const keystone: Keystone = new Keystone(dungeon, key);
            const entry: KeystoneEntry = new KeystoneEntry(new Character(character), keystone, new Date().getTime());
            return entryRepo.Add(entry).then(() => {
                return `**${keystone}** added to **${character}**`;
            });
        });
    }
};