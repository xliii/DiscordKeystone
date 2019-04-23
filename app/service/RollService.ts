export class RollService {

    public roll(from: number, to: number): number {
        return Math.floor(Math.random() * (to - from)) + from;
    }
}