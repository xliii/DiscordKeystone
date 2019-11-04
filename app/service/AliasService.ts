import {Message} from "discord.js";

import repositories from "../repository/Repositories";
const repository = repositories.aliasRepository();

export class AliasService {

    public extractAlias(message: Message): Promise<string> {
        const discordId: string = message.author.id;
        const discordName: string = message.author.username;
        return repository.Get(discordId)
            .then(alias => alias.character)
            .catch(() => {
                throw `No alias found for **${discordName}**`
            });
    }
}