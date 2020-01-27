import {StringResolvable} from "discord.js";
import {RollService} from "../../service/RollService";

module.exports = function(args: string[]): StringResolvable {
    const usage = "Usage: **/keys roll [from] [to]**";

    if (args.length < 1) {
        return roll(1, 100);
    }

    let to = parseInt(args[0]);
    if (isNaN(to)) {
        return usage;
    }

    if (args.length == 1) {
        return roll(1, to);
    }

    let from = parseInt(args[1]);
    if (isNaN(from)) {
        return usage;
    }

    return roll(from, to);

    function roll(from: number, to: number): StringResolvable {
        return new RollService().roll(from, to).toString();
    }
};