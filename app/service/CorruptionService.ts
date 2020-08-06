import {Corruption} from "../model/Corruption";
import {CorruptionType} from "../model/CorruptionType";

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

        let start = Date.parse("Jul 14, 2020");
        let date = new Date();

        let diff_ms = date.getTime() - start;

        let days_passed = diff_ms / day;
        let rotation = Math.floor(days_passed / 3.5);

        return rotation % 7;
    }

    public listCorruptions(): Promise<Corruption[]> {
        return Promise.resolve(this.ROTATIONS[this.rotationIndex()]);
    }
}

export default new CorruptionService();