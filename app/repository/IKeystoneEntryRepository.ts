import {KeystoneEntry} from "../model/KeystoneEntry";
import {Keystone} from "../model/Keystone";

export interface IKeystoneEntryRepository {
    List(): KeystoneEntry[];
    Clear(): void;
    Add(entry: KeystoneEntry): void;
    Remove(user: string): Keystone | undefined;
}