import {Keystone} from "./Keystone";
import {Character} from "./Character";

export class KeystoneEntry {
    character: Character;
    keystone: Keystone;
    timestamp: number;

    constructor(character: Character, keystone: Keystone, timestamp: number) {
        this.character = character;
        this.keystone = keystone;
        this.timestamp = timestamp;
    }

    toString():string {
        return `**${this.character}**: ${this.keystone}`;
    }

    public equals(o: KeystoneEntry) {
        return this.character.equals(o.character) && this.keystone.equals(o.keystone);
    }

    public olderThan(o: KeystoneEntry) {
        return this.timestamp < o.timestamp;
    }

    public static fromJSON(obj: any): KeystoneEntry {
        return new KeystoneEntry(Character.fromJSON(obj["character"]), Keystone.fromJSON(obj["keystone"]), obj["timestamp"]);
    }
}