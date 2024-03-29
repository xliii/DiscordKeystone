import {IKeystoneEntryRepository} from "../IKeystoneEntryRepository";
import {KeystoneEntry} from "../../model/KeystoneEntry";
import {AbstractFileRepository} from "./AbstractFileRepository";
import weeklyService from "../../service/WeeklyService";

class KeystoneEntryFileRepository extends AbstractFileRepository implements IKeystoneEntryRepository {

    constructor() {
        super();
    }

    protected repoPath(): string {
        return "./data/keystones.json";
    }

    Clear(): Promise<void> {
        return this.write({});
    }

    Add(entry: KeystoneEntry): Promise<boolean> {
        return this.readObject().then((map: any) => {
            let key = entry.character.name;
            if (map[key] && !this.canReplace(entry, map[key])) {
                return false;
            }

            map[key] = entry;
            return this.write(map).then(() => true);
        });
    }

    AddAll(entries: KeystoneEntry[]): Promise<KeystoneEntry[]> {
        return this.readObject().then((map: any) => {
            let updated: KeystoneEntry[] = [];
            entries.forEach(entry => {
                let key = entry.character.name;
                if (!this.canReplace(entry, map[key])) {
                    return false;
                }

                map[key] = entry;
                updated.push(entry);
            });
            return updated.length > 0 ? this.write(map).then(() => updated) : updated;
        });
    }

    private canReplace(newEntry: KeystoneEntry, oldEntry: any): boolean {
        if (newEntry.olderThanDate(weeklyService.weekStart())) {
            console.log(`${newEntry} is from previous week`);
            return false;
        }

        if (!oldEntry) {
            return true;
        }

        let old = KeystoneEntry.fromJSON(oldEntry);

        if (newEntry.equals(old)) {
            console.log(`${newEntry} is already present`);
            return false;
        }
        if (newEntry.olderThanKeystone(old)) {
            console.log(`${newEntry} is older than existing key: ${old}`);
            return false;
        }

        console.log(`Adding ${newEntry}`);

        return true;
    }

    List(): Promise<KeystoneEntry[]> {
        return this.readObject().then((map: any) => {
            return Object.keys(map)
                .map(prop => KeystoneEntry.fromJSON(map[prop]))
                .filter(key => !key.olderThanDate(weeklyService.weekStart()))
        });
    }

    Remove(character: string): Promise<KeystoneEntry | undefined> {
        return this.readObject().then((map: any) => {
            let entry = map[character];
            if (!entry) {
                return Promise.resolve(undefined);
            }

            delete map[character];
            return this.write(map).then(() => KeystoneEntry.fromJSON(entry));
        });
    }
}

export default new KeystoneEntryFileRepository();