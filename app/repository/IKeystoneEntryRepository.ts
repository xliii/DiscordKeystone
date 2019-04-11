import {KeystoneEntry} from "../model/KeystoneEntry";

export interface IKeystoneEntryRepository {
    Clear(): Promise<void>;
    Remove(character: string): Promise<KeystoneEntry | undefined>;
    List(): Promise<KeystoneEntry[]>;
    Add(entry: KeystoneEntry): Promise<Boolean>;
    AddAll(entry: KeystoneEntry[]): Promise<KeystoneEntry[]>;
}