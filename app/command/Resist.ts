import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";

import {ResistService} from "../service/ResistService";

class Clear extends Command {

    public name(): string {
        return "Resist";
    }

    protected usage(): string {
        return "/keys resist";
    }

    clearInput(): boolean {
        return false;
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        let resist = new ResistService().maxResist();
        return Promise.resolve(`Max resist this week: **${resist}**`);
    }
}

export default new Clear();