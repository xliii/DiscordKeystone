import {Command} from "../model/Command";
import {Message} from "discord.js";
import {FEATURE_PHREAKS} from "../model/Features";

class Coffee extends Command {

    public name(): string {
        return "Coffee";
    }

    protected usage(): string {
        return "/keys coffee";
    }

    feature(): string {
        return FEATURE_PHREAKS;
    }

    protected noArg(context: Message): Promise<any> {
        return Promise.resolve("IDI NAHUJ");
    }
}

export default new Coffee();