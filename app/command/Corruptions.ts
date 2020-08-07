import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import CorruptionService from "../service/CorruptionService";

class Corruptions extends Command {

    public name(): string {
        return "Corruptions";
    }

    protected usage(): string {
        return "Usage: /keys corruptions **Corruption** **Level**";
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
        let lvl = this.parseLevel(level);
        return CorruptionService.findCorruption(corruption, lvl);
    }

    protected threeArg(corruption1: string, corruption2: string, level: string, context: Message): Promise<StringResolvable> {
        let lvl = this.parseLevel(level);
        return CorruptionService.findCorruption(corruption1 + ' ' + corruption2, lvl);
    }

    private parseLevel(level: string): number {
         let num = parseInt(level);
         if (!isNaN(num)) {
             return num;
         }

         level = level.toUpperCase();
         switch (level) {
             case "I": return 1;
             case "II": return 2;
             case "III": return 3;
             default: throw `Invalid corruption level: ${level}`;
         }
    }
}

export default new Corruptions();