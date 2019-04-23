import {StringResolvable} from "discord.js";
import {RollService} from "../service/RollService";

module.exports = function(args: string[]): StringResolvable {
    if (args.length < 1) {
        return roll(1, 100);
    }

    let to = parseInt(args[0]);
    return args.length == 1 ? roll(1, to) : roll(parseInt(args[1]), to);

    function roll(from: number, to: number): StringResolvable {
        return new RollService().roll(from, to).toString();
    }
};