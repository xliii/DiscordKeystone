import fs = require("fs");
import {IKeystoneEntryRepository} from "../IKeystoneEntryRepository";
import {KeystoneEntry} from "../../model/KeystoneEntry";

export class KeystoneEntryFileRepository implements IKeystoneEntryRepository {

    private static PATH: string = "./data/keystones.json";

    Clear(): Promise<void> {
        return this.write({});
    }

    Add(entry: KeystoneEntry): Promise<boolean> {
        return this.read().then((map: any) => {
            let key = entry.character.name;
            if (map[key] && entry.equals(map[key])) {
                return false;
            }
            map[key] = entry;
            return this.write(map).then(() => true);
        });
    }

    AddAll(entries: KeystoneEntry[]): Promise<KeystoneEntry[]> {
        return this.read().then((map: any) => {
            let updated: KeystoneEntry[] = [];
            entries.forEach(entry => {
                let key = entry.character.name;
                if (map[key] && entry.equals(map[key])) {
                    return false;
                }

                map[key] = entry;
                updated.push(entry);
            });
            return updated.length > 0 ? this.write(map).then(() => updated) : updated;
        });
    }

    List(): Promise<KeystoneEntry[]> {
        return this.read().then((map: any) => {
            return Object.keys(map)
                .map(prop => KeystoneEntry.fromJSON(map[prop]));
        });
    }

    Remove(character: string): Promise<KeystoneEntry | undefined> {
        return this.read().then((map: any) => {
            let entry = map[character];
            if (!entry) {
                return Promise.resolve(undefined);
            }

            delete map[character];
            return this.write(map).then(() => KeystoneEntry.fromJSON(entry));
        });
    }

    private read(): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            fs.readFile(KeystoneEntryFileRepository.PATH, "utf8", ((err, data: string) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        return resolve([]);
                    } else {
                        return reject(err);
                    }
                }

                resolve(JSON.parse(data));
            }));
        })
    }

    private write(entries:any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const data = JSON.stringify(entries, null, 2);
            fs.writeFile(KeystoneEntryFileRepository.PATH, data, "utf8", err => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }
}