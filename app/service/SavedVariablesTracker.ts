import {TextChannel} from "discord.js";
import {readFileSync, watchFile} from "fs";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Keystone} from "../model/Keystone";
import {IDungeonRepository} from "../repository/IDungeonRepository";
import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {Dungeon} from "../model/Dungeon";

export class SavedVariablesTracker {

    channel: TextChannel;
    dungeonRepo: IDungeonRepository;

    constructor(channel: TextChannel, path?: string) {
        this.channel = channel;
        this.dungeonRepo = new DungeonFileRepository();
        if (path) {
            console.log(`Tracking SavedVariables at ${path}`);
            this.extractKeystones(path);
            watchFile(path, () => {
                console.log("SavedVariables has changed: Updating...");
                this.extractKeystones(path);
            });
        }
    }

    private extractKeystones(path: string): any {
        const content = readFileSync(path, "utf8");
        const marker = '["keystones"] = {';
        let start = content.indexOf(marker);
        let keystoneSection = content.substring(start + marker.length, content.indexOf('}', start));
        let keystones = keystoneSection.split(',')
            .map(entry => entry.trim())
            .filter(entry => entry.length > 0)
            .map(entry => this.parseEntry(entry));
        console.log(keystones);
    }

    private parseEntry(entry: string): KeystoneEntry {
        const match: RegExpMatchArray | null = entry.match(/\["(.*)-(.*)"] = "\|cffa335ee\|Hkeystone:158923:(\d{3}):(\d*):.*/);
        if (!match) {
            throw new Error("Invalid format: " + entry);
        }

        const character = match[1];
        const realm = match[2];
        const dungeonId = parseInt(match[3]);
        const key = parseInt(match[4]);

        const dungeon:Dungeon = this.dungeonRepo.Get(dungeonId);
        return new KeystoneEntry(character, new Keystone(dungeon, key));
    }
}