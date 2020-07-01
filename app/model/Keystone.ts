import {Dungeon} from "./Dungeon";

export class Keystone {
    dungeon: Dungeon;
    key: number;

    constructor(dungeon: Dungeon, key: number) {
        this.dungeon = dungeon;
        if (isNaN(key) || key <= 0) {
            throw 'Keystone level should be positive number'
        }
        this.key = key;
    }

    toString():string {
        return `${this.dungeon.name} ${this.key}`;
    }

    public equals(o: Keystone) {
        return this.dungeon.equals(o.dungeon) && this.key === o.key;
    }

    public static fromJSON(obj: any): Keystone {
        return new Keystone(Dungeon.fromJSON(obj["dungeon"]), obj["key"]);
    }
}