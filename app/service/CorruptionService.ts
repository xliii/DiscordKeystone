import {Corruption} from "../model/Corruption";
import {CorruptionType} from "../model/CorruptionType";
import {camelcase} from "./Util";

class CorruptionService {

    private ONE:Corruption[] = [
        new Corruption(CorruptionType.INEFFABLE_TRUTH, 1),
        new Corruption(CorruptionType.HONED_MIND, 1),
        new Corruption(CorruptionType.STRIKETHROUGH, 2),
        new Corruption(CorruptionType.MASTERFUL, 2),
        new Corruption(CorruptionType.EXPEDIENT, 3),
        new Corruption(CorruptionType.TWISTED_APPENDAGE, 3)
    ];

    private TWO:Corruption[] = [
        new Corruption(CorruptionType.INEFFABLE_TRUTH, 2),
        new Corruption(CorruptionType.VOID_RITUAL, 1),
        new Corruption(CorruptionType.DEADLY_MOMENTUM, 2),
        new Corruption(CorruptionType.MASTERFUL, 1),
        new Corruption(CorruptionType.VERSATILE, 3),
        new Corruption(CorruptionType.SIPHONER, 2),
        new Corruption(CorruptionType.AVOIDANT, 2)
    ];

    private THREE:Corruption[] = [
        new Corruption(CorruptionType.INFINITE_STARS, 1),
        new Corruption(CorruptionType.SURGING_VITALITY, 1),
        new Corruption(CorruptionType.GLIMPSE_OF_CLARITY, 1),
        new Corruption(CorruptionType.SEVERE, 2),
        new Corruption(CorruptionType.RACING_PULSE, 3),
        new Corruption(CorruptionType.SIPHONER, 3),
        new Corruption(CorruptionType.AVOIDANT, 3)
    ];

    private FOUR:Corruption[] = [
        new Corruption(CorruptionType.TWILIGHT_DEVASTATION, 2),
        new Corruption(CorruptionType.SEVERE, 1),
        new Corruption(CorruptionType.STRIKETHROUGH, 3),
        new Corruption(CorruptionType.HONED_MIND, 3),
        new Corruption(CorruptionType.EXPEDIENT, 2),
        new Corruption(CorruptionType.SIPHONER, 1)
    ];

    private FIVE:Corruption[] = [
        new Corruption(CorruptionType.INFINITE_STARS, 3),
        new Corruption(CorruptionType.RACING_PULSE, 2),
        new Corruption(CorruptionType.ECHOING_VOID, 2),
        new Corruption(CorruptionType.SEVERE, 3),
        new Corruption(CorruptionType.EXPEDIENT, 1),
        new Corruption(CorruptionType.TWISTED_APPENDAGE, 1)
    ];

    private SIX:Corruption[] = [
        new Corruption(CorruptionType.TWILIGHT_DEVASTATION, 3),
        new Corruption(CorruptionType.RACING_PULSE, 1),
        new Corruption(CorruptionType.STRIKETHROUGH, 1),
        new Corruption(CorruptionType.MASTERFUL, 3),
        new Corruption(CorruptionType.SURGING_VITALITY, 2),
        new Corruption(CorruptionType.VOID_RITUAL, 2),
        new Corruption(CorruptionType.AVOIDANT, 1)
    ];

    private SEVEN:Corruption[] = [
        new Corruption(CorruptionType.INFINITE_STARS, 2),
        new Corruption(CorruptionType.DEADLY_MOMENTUM, 3),
        new Corruption(CorruptionType.ECHOING_VOID, 1),
        new Corruption(CorruptionType.HONED_MIND, 2),
        new Corruption(CorruptionType.VERSATILE, 1),
        new Corruption(CorruptionType.VOID_RITUAL, 3),
        new Corruption(CorruptionType.GUSHING_WOUND, 1)
    ];

    private EIGHT:Corruption[] = [
        new Corruption(CorruptionType.TWILIGHT_DEVASTATION, 1),
        new Corruption(CorruptionType.SURGING_VITALITY, 3),
        new Corruption(CorruptionType.ECHOING_VOID, 3),
        new Corruption(CorruptionType.DEADLY_MOMENTUM, 1),
        new Corruption(CorruptionType.VERSATILE, 2),
        new Corruption(CorruptionType.TWISTED_APPENDAGE, 2)
    ];

    private ROTATIONS = [this.ONE, this.TWO, this.THREE, this.FOUR, this.FIVE, this.SIX, this.SEVEN, this.EIGHT];

    private rotationIndex(): number {
        let day = 1000 * 60 * 60 * 24;

        let start = Date.UTC(2020, 6, 14);
        let date = new Date();

        let diff_ms = date.getTime() - start;

        let days_passed = diff_ms / day;
        let rotation = Math.floor(days_passed / 3.5);

        return rotation % 8;
    }

    private floorDate(date: Date): Date {
        let day = 1000 * 60 * 60 * 24;

        let start = Date.UTC(2020, 6, 14);
        let diff_ms = date.getTime() - start;
        let days_passed = diff_ms / day;
        let rotation = Math.floor(days_passed / 3.5);
        let rounded = new Date(start);
        rounded.setDate(rounded.getDate() + rotation * 3.5);
        return rounded;
    }

    private find(corruption: Corruption) : number {
        for (let i = 0; i < this.ROTATIONS.length; i++) {
            if (this.ROTATIONS[i].some(e => e.equals(corruption))) {
                return i;
            }
        }
        return -1;
    }

    public findCorruption(corruptStr: string, level: number): Promise<string> {
        let corruption = new Corruption(camelcase(corruptStr) as CorruptionType, level);
        let current = this.rotationIndex();
        let index = this.find(corruption);
        if (index < 0) {
            return Promise.resolve('Unknown corruption: ' + corruption);
        }
        let date = this.findDate(current, index);
        let d = ('0' + date.getDate()).slice(-2);
        let m = ('0' + (date.getMonth() + 1)).slice(-2);
        let y = date.getFullYear();
        return Promise.resolve(`${corruption} will be available on ${d}/${m}/${y}`);
    }

    private findDate(current: number, index: number): Date {
        let date = this.floorDate(new Date());
        let rotationDelta = (index + 8 - current) % 8;
        let dayDelta = rotationDelta * 3.5;
        date.setDate(date.getDate() + dayDelta);
        return date;
    }

    public listCorruptions(): Promise<Corruption[]> {
        return Promise.resolve(this.ROTATIONS[this.rotationIndex()]);
    }
}

export default new CorruptionService();