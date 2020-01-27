import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import {RioService} from "../service/RioService";
import {AliasService} from "../service/AliasService";

class Rio extends Command {

    public name(): string {
        return "Rio";
    }

    protected usage(): string {
        return "/keys rio [character]";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        const aliasService = new AliasService();
        return aliasService.extractAlias(context).then(alias => {
            return this.getRio(alias);
        });
    }


    protected oneArg(arg1: string, context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.getRio(arg1));
    }

    private getRio(character: string) {
        const rioService = new RioService();

        return rioService.RioScore(character).then((score: String) => {
            return Promise.resolve(`**${character}**'s Raider.io score is **${score}**`);
        }).catch((notFound: string) => {
            return Promise.resolve(`${notFound}: **${character}**`);
        });
    }
}

export default new Rio();