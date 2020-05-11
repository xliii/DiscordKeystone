export class ResistService {

    public maxResist(): number {
        let week = 1000 * 60 * 60 * 24 * 7;

        let start = Date.parse("April 1, 2020");
        let date = new Date();

        let diff_ms = date.getTime() - start;

        let weeks_passed = Math.floor(diff_ms / week);

        return 56 + weeks_passed * 3;
    }
}