import {Client, Message, StringResolvable} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {Alias} from "../model/Alias";

module.exports = function(args: string[], message: Message, client: Client): StringResolvable {
    const usage = ["**Usage:**",
        "/keys alias set [character]",
        "/keys alias get",
        "/keys alias list",
        "/keys alias remove"];

    if (args.length < 1) {
        return usage;
    }

    const option: string = args[0];
    switch (option) {
        case "set": return set(message, args.slice(1));
        case "get": return get(message);
        case "remove": return remove(message);
        case "list": return list(client);
        default: return usage;
    }

};

function set(message: Message, args: string[]): StringResolvable {
    if (args.length !== 1) {
        return "**Usage**: /keys alias set [character]"
    }

    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    const character: string = args[0];
    const repository = new AliasFileRepository();

    repository.Add(new Alias(discordName, discordId, character));
    return `Alias **${character}** added for **${discordName}**`;
}

function get(message: Message): StringResolvable {
    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    const repository = new AliasFileRepository();
    try {
        const alias = repository.Get(discordId);
        return `**${discordName}**'s alias is **${alias.character}**`;
    } catch (e) {
        throw `No alias found for **${discordName}**`;
    }
}

function list(client: Client): StringResolvable {
    const repository = new AliasFileRepository();
    const aliases: Alias[] = repository.List();

    return aliases.length > 0 ?
        aliases :
        "No aliases available";
}

function remove(message: Message): StringResolvable {
    const repository = new AliasFileRepository();
    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    let alias: any = repository.Remove(discordId);
    return alias ?
        `Alias **${alias.character}** added for **${discordName}**` :
        `No alias found for **${discordName}`;
}