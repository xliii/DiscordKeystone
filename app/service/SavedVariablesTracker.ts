import {TextChannel} from "discord.js";
import {readFileSync, watchFile} from "fs";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Keystone} from "../model/Keystone";
import {Character} from "../model/Character";
import {defaultRealm} from "../model/Settings";
import {sendMessage} from "./Util";

import repositories from "../repository/Repositories";
const dungeonRepo = repositories.dungeonRepository();
const keystoneRepo = repositories.keystoneRepository();

export class SavedVariablesTracker {

    private channel: TextChannel;

    constructor(channel: TextChannel, path?: string) {
        this.channel = channel;

        if (path) {
            this.extractKeystones(path);
            watchFile(path, () => {
                try {
                    this.extractKeystones(path);
                } catch (e) {
                    console.error(`Error while updating saved variables: ${e}`);
                }
            });
        }
    }

    private extractKeystones(path: string): void {
        const content = readFileSync(path, "utf8");
        const marker = '["keystones"] = {';
        let start = content.indexOf(marker);
        let keystoneSection = content.substring(start + marker.length, content.indexOf('}', start));
        let keystonePromises:Promise<KeystoneEntry>[] = keystoneSection.split(',')
            .map(entry => entry.trim())
            .filter(entry => entry.length > 0)
            .map(entry => this.parseEntry(entry));

        Promise.all(keystonePromises).then(keystones => {
            keystones = keystones.filter(entry => entry.character.realm === defaultRealm());
            if (keystones.length > 0) {
                keystoneRepo.AddAll(keystones).then(result => {
                    if (result.length > 0) {
                        let message = result.map((k) => k.toString());
                        message.unshift(`${result.length} keystones fetched from !keys:`);
                        sendMessage(this.channel, message);
                    }
                })
            }
        });
    }

    private parseEntry(entry: string): Promise<KeystoneEntry> {
        const match: RegExpMatchArray | null = entry.match(/\["(.*)-(.*)"] = "(\d*)\|(\d*)\|(\d*)\|(.*)/);
        if (!match || match.length != 7) {
            throw new Error("Invalid format: " + entry);
        }

        const character = match[1];
        const realm = match[2];
        const dungeonId = parseInt(match[3]);
        const key = parseInt(match[4]);
        const timestamp = parseInt(match[5]);
        //const dungeonName = match[6];

        return dungeonRepo.Get(dungeonId).then(dungeon => {
            return new KeystoneEntry(new Character(character, realm), new Keystone(dungeon, key), timestamp);
        });
    }
}