import {Message, StringResolvable} from "discord.js";
import {AliasService} from "../service/AliasService";
import {RioService} from "../service/RioService";

module.exports = function(args: string[], message: Message): Promise<StringResolvable> {
    let character: string;
    if (args.length > 0) {
        character = args[0];
    } else {
        const aliasService = new AliasService();
        try {
            character = aliasService.extractAlias(message);
        } catch (notFound) {
            return notFound;
        }
    }

    const rioService = new RioService();

    return rioService.RioScore(character).then((score: String) => {
        return Promise.resolve(`**${character}**'s Raider.io score is **${score}**`);
    }).catch((notFound: string) => {
        return Promise.resolve(`${notFound}: **${character}**`);
    });
};