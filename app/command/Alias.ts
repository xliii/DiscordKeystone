import {Message, StringResolvable} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {Alias} from "../model/Alias";
import {AliasService} from "../service/AliasService";

module.exports = function(args: string[], message: Message): Promise<StringResolvable> {
    const usage = Promise.resolve(["**Usage:**",
        "/keys alias set [character]",
        "/keys alias get",
        "/keys alias list",
        "/keys alias remove"]);

    if (args.length < 1) {
        return usage;
    }

    const option: string = args[0];
    switch (option) {
        case "set": return set(message, args.slice(1));
        case "get": return get(message);
        case "remove": return remove(message);
        case "list": return list();
        default: return usage;
    }

};

function set(message: Message, args: string[]): Promise<StringResolvable> {
    if (args.length !== 1) {
        return Promise.resolve("**Usage**: /keys alias set [character]");
    }

    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    const character: string = args[0];
    const repository = new AliasFileRepository();

    return repository.Add(new Alias(discordName, discordId, character)).then(() => {
        return `Alias **${character}** added for **${discordName}**`;
    });
}

function get(message: Message): Promise<StringResolvable> {
    let service = new AliasService();
    return service.extractAlias(message).then(character => {
        return `**${message.author.username}**'s alias is **${character}**`;
    })

}

function list(): Promise<StringResolvable> {
    const repository = new AliasFileRepository();
    return repository.List().then(aliases => {
        return aliases.length > 0 ?
            aliases :
            "No aliases available";
    });
}

function remove(message: Message): Promise<StringResolvable> {
    const repository = new AliasFileRepository();
    const discordId: string = message.author.id;
    const discordName: string = message.author.username;
    return repository.Remove(discordId).then(alias => {
        return alias ?
            `Alias **${alias.character}** removed from **${discordName}**` :
            `No alias found for **${discordName}**`;
    })
}