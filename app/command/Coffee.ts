import {Command} from "./Command";
import {Message, StringResolvable} from "discord.js";

class Coffee extends Command {

    public name(): string {
        return "Coffee";
    }

    protected usage(): string {
        return "/keys coffee";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return Promise.resolve("IDI NAHUJ");
    }
}

export default new Coffee();