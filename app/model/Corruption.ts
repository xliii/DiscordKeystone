import {CorruptionType} from "./CorruptionType";
import {camelcase} from "../service/Util";

export class Corruption {

    corruption: CorruptionType;
    level: number;

    constructor(corruption: CorruptionType, level: number) {
        this.corruption = corruption;
        if (level < 1 && level > 3) {
            throw `Invalid corruption level: ${level}`;
        }
        this.level = level;
    }

    public equals(o: Corruption): boolean {
        return this.corruption == o.corruption && this.level == o.level;
    }

    toString():string {
        let corruption = camelcase(this.corruption);
        let lvl = this.romanLevel();
        return `**${corruption} ${lvl}**`;
    }

    private romanLevel():string {
        switch (this.level) {
            case 3: return 'III';
            case 2: return 'II';
            case 1: return 'I';
            default: throw `Invalid corruption level: ${this.level}`;
        }
    }

    public static fromJSON(obj:any): Corruption {
        return new Corruption(obj["corruption"], obj["level"]);
    }
}