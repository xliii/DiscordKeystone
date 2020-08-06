import {CorruptionType} from "./CorruptionType";

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
        return this.corruption === o.corruption && this.level === o.level;
    }

    private formatCorruption(): string {
        let corruption = CorruptionType[this.corruption];
        return corruption.split('_').map(v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join(' ');
    }

    toString():string {
        let corruption = this.formatCorruption();
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