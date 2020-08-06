import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import CorruptionService from "../service/CorruptionService";

class Corruptions extends Command {

    public name(): string {
        return "Corruptions";
    }

    protected usage(): string {
        return "/keys corruptions";
    }


    protected aliases(): string[] {
        return ["corrupts", "corrupt", "corruption"];
    }

    clearInput(): boolean {
        return false;
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return CorruptionService.listCorruptions().then(corruptions => {
            let result = [];
            result.push("Current corruptions:");
            result.push(...corruptions);
            return result;
        });
    }

    protected twoArg(corruption: string, level: string, context: Message): Promise<StringResolvable> {
        let lvl = parseInt(level);
        return CorruptionService.findCorruption(corruption, lvl);
    }
}

export default new Corruptions();