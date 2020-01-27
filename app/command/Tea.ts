import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";

class Tea extends Command {

    public name(): string {
        return "Tea";
    }

    protected usage(): string {
        return "/keys tea";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return Promise.resolve("https://i.ytimg.com/vi/755BDwzxv5c/hqdefault.jpg");
    }
}

export default new Tea();