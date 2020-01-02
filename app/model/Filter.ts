import {KeystoneEntry} from "./KeystoneEntry";

export class Filter {
    public header: string;
    public filter: (e: KeystoneEntry) => boolean;

    constructor(input: string, filter: (key: number, dungeon: string) => boolean) {
        this.header = `Keystones (${input}):`;
        this.filter = (e: KeystoneEntry) => filter(e.keystone.key, e.keystone.dungeon.name);
    }
}