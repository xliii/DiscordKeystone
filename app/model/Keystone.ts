import {Dungeon} from "./Dungeon";

export class Keystone {
    dungeon: Dungeon;
    key: number;

    constructor(dungeon: Dungeon, key: number) {
        this.dungeon = dungeon;
        this.key = key;
    }

    toString():string {
        return `${this.dungeon.name} ${this.key}`;
    }

    public static fromJSON(obj: any): Keystone {
        return new Keystone(Dungeon.fromJSON(obj["dungeon"]), obj["key"]);
    }
}