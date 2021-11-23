import {Command} from "../model/Command";
import {Message} from "discord.js";
import {FEATURE_PHREAKS} from "../model/Features";

class Tea extends Command {

    public name(): string {
        return "Tea";
    }

    protected usage(): string {
        return "/keys tea";
    }

    feature(): string {
        return FEATURE_PHREAKS;
    }

    protected noArg(context: Message): Promise<any> {
        return Promise.resolve("https://i.ytimg.com/vi/755BDwzxv5c/hqdefault.jpg");
    }
}

export default new Tea();