import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import AffixesService from "../service/AffixesService";

class Affixes extends Command {

    public name(): string {
        return "Affixes";
    }

    protected usage(): string {
        return "/keys affixes";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return AffixesService.getAffixes();
    }
}

export default new Affixes();