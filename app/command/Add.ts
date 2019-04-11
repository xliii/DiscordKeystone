import {Keystone} from "../model/Keystone";
import {Dungeon} from "../model/Dungeon";
import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Message, StringResolvable} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {Character} from "../model/Character";

module.exports = function(args: string[], message:Message): StringResolvable {

    const usage = "Usage: **/keys add {character} [dungeon] [key]**";

    if (args.length < 2) {
        return usage;
    }

    switch (args.length) {
        case 2: return addAlias(args, message);
        case 3: return addExplicit(args);
        default: return usage;
    }

    function addAlias(args: string[], message: Message): StringResolvable {
        const dungeonName: string = args[0];
        const key: number = parseInt(args[1]);
        const discordId: string = message.author.id;

        const aliasRepo = new AliasFileRepository();
        const alias = aliasRepo.Get(discordId);
        return addKeystone(alias.character, dungeonName, key);
    }

    function addExplicit(args: string[]): StringResolvable {
        const character: string = args[0];
        const dungeonName: string = args[1];
        const key: number = parseInt(args[2]);
        return addKeystone(character, dungeonName, key);
    }
    
    function addKeystone(character:string, dungeonName:string, key:number): StringResolvable {
        const dungeonRepo = new DungeonFileRepository();
        const entryRepo = new KeystoneEntryFileRepository();
        const dungeon: Dungeon = dungeonRepo.GetByName(dungeonName);
        const keystone: Keystone = new Keystone(dungeon, key);
        const entry: KeystoneEntry = new KeystoneEntry(new Character(character), keystone);
        return entryRepo.Add(entry).then(() => {
            return `**${keystone}** added to **${character}**`;
        });
    }
};