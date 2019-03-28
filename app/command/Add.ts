import {Keystone} from "../model/Keystone";
import {Dungeon} from "../model/Dungeon";
import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {KeystoneEntry} from "../model/KeystoneEntry";

module.exports = function(args: string[]): any {
    if (args.length !== 3) {
        return "Usage: **/keys add [character] [dungeon] [key]**";
    }

    let username: string = args[0];
    let dungeonName: string = args[1];
    let key: number = parseInt(args[2]);

    let dungeonRepo = new DungeonFileRepository();
    let entryRepo = new KeystoneEntryFileRepository();
    try {
        let dungeon: Dungeon = dungeonRepo.Get(dungeonName);
        let keystone: Keystone = new Keystone(dungeon, key);
        let entry: KeystoneEntry = new KeystoneEntry(username, keystone);
        entryRepo.Add(entry);
        return `**${keystone}** added to **${username}**`;
    } catch (e) {
        return e;
    }

};