import {Message, StringResolvable} from "discord.js";
import {AliasService} from "../service/AliasService";
import {RioService} from "../service/RioService";

module.exports = function(args: string[], message: Message): Promise<StringResolvable> {
    const aliasService = new AliasService();
    const rioService = new RioService();
    try {
        const alias = aliasService.extractAlias(message);
        return rioService.RioScore(alias).then((score: String) => {
            return Promise.resolve(`**${alias}**'s Raider.io score is **${score}**`);
        })
    } catch (notFound) {
        return notFound;
    }
};