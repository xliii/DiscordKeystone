import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import NekoService from "../service/NekoService";

class Neko extends Command {

    public name(): string {
        return "Neko";
    }

    protected usage(): string {
        return "/keys neko";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return NekoService.getNeko();
    }
}

export default new Neko();