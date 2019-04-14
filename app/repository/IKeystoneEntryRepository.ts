import {KeystoneEntry} from "../model/KeystoneEntry";
import {IRepository} from "./IRepository";

export interface IKeystoneEntryRepository extends IRepository<KeystoneEntry> {
    Clear(): Promise<void>;
    Remove(character: string): Promise<KeystoneEntry | undefined>;
    Add(entry: KeystoneEntry): Promise<Boolean>;
    AddAll(entry: KeystoneEntry[]): Promise<KeystoneEntry[]>;
}