import {Keystone} from "./Keystone";

export class KeystoneEntry {
    user: string;
    keystone: Keystone;

    constructor(user: string, keystone: Keystone) {
        this.user = user;
        this.keystone = keystone;
    }

    toString():string {
        return `**${this.user}**: ${this.keystone}`;
    }

    public static fromJSON(obj: any): KeystoneEntry {
        return new KeystoneEntry(obj["user"], Keystone.fromJSON(obj["keystone"]));
    }
}