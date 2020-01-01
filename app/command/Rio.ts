import {Message, StringResolvable} from "discord.js";
import {AliasService} from "../service/AliasService";
import {RioService} from "../service/RioService";
import {camelcase} from "../service/Util";

module.exports = function(args: string[], message: Message): Promise<StringResolvable> {
    if (args.length > 0) {
        return process(camelcase(args[0]));
    } else {
        const aliasService = new AliasService();
        return aliasService.extractAlias(message).then(alias => {
            return process(alias);
        });
    }
};

function process(character: string) {
    const rioService = new RioService();

    return rioService.RioScore(character).then((score: String) => {
        return Promise.resolve(`**${character}**'s Raider.io score is **${score}**`);
    }).catch((notFound: string) => {
        return Promise.resolve(`${notFound}: **${character}**`);
    });
}