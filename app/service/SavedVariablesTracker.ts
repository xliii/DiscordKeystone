import {TextChannel} from "discord.js";
import {readFileSync, watchFile} from "fs";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Keystone} from "../model/Keystone";
import {IDungeonRepository} from "../repository/IDungeonRepository";
import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {Dungeon} from "../model/Dungeon";
import {Character} from "../model/Character";
import {defaultRealm} from "../model/Settings";
import {IKeystoneEntryRepository} from "../repository/IKeystoneEntryRepository";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";

export class SavedVariablesTracker {

    channel: TextChannel;
    dungeonRepo: IDungeonRepository;
    keystoneRepo: IKeystoneEntryRepository;
    entryCache: KeystoneEntry[];

    constructor(channel: TextChannel, path?: string) {
        this.channel = channel;
        this.dungeonRepo = new DungeonFileRepository();
        this.keystoneRepo = new KeystoneEntryFileRepository();
        this.entryCache = [];
        if (path) {
            console.log(`Tracking SavedVariables at ${path}`);
            this.entryCache = this.extractKeystones(path, true);
            watchFile(path, () => {
                try {
                    console.log("SavedVariables has changed: Updating...");
                    this.extractKeystones(path, false);
                } catch (e) {
                    console.error(`Error while updating saved variables: ${e}`);
                }
            });
        }
    }

    private extractKeystones(path: string, initial: boolean): KeystoneEntry[] {
        const content = readFileSync(path, "utf8");
        const marker = '["keystones"] = {';
        let start = content.indexOf(marker);
        let keystoneSection = content.substring(start + marker.length, content.indexOf('}', start));
        let keystones = keystoneSection.split(',')
            .map(entry => entry.trim())
            .filter(entry => entry.length > 0)
            .map(entry => this.parseEntry(entry))
            .filter(entry => entry.character.realm === defaultRealm());

        if (!initial) {
            let newKeystones = keystones.filter(
                (keystone => !this.entryCache.find(
                    cached => cached.equals(keystone)
                ))
            );

            if (newKeystones.length > 0) {
                this.keystoneRepo.AddAll(newKeystones).then(result => {
                    if (result.length > 0) {
                        console.log(`${result.length} keystones fetched from !keys: ${result}`);
                        let message = result.map((k) => k.toString());
                        message.unshift(`${result.length} keystones fetched from !keys:`);
                        this.channel.send(message);
                    }
                })
            }
        }

        return keystones;
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
        return new KeystoneEntry(new Character(character, realm), new Keystone(dungeon, key));
    }
}