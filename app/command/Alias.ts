import {Client, Message} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {Alias} from "../model/Alias";

module.exports = function(args: string[], client: Client, message: Message): any {
    const usage = ["**Usage:**",
        "/keys alias set [character]",
        "/keys alias get",
        "/keys alias list"];

    if (args.length < 1) {
        return usage;
    }

    const option: string = args[0];
    switch (option) {
        case "set": return set(message, args.slice(1));
        case "get": return get(message);
        case "list": return list();
        default: return usage;
    }

};

function set(message: Message, args: string[]) {
    if (args.length !== 1) {
        return "**Usage**: /keys alias set [character]"
    }

    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    const character: string = args[0];
    const repository = new AliasFileRepository();

    repository.Add(new Alias(discordId, character));
    return `Alias **${character}** added for **${discordName}**`;
}

function get(message: Message) {
    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    const repository = new AliasFileRepository();
    try {
        const alias = repository.Get(discordId);
        return `**${discordName}**'s alias is **${alias.character}**`;
    } catch (e) {
        return `No alias found for **${discordName}**`;
    }
}

function list() {
    const repository = new AliasFileRepository();
    const aliases: Alias[] = repository.List();

    return aliases.length > 0 ?
        aliases :
        "No aliases available";
}