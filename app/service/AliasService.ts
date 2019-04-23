import {Message} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {IAliasRepository} from "../repository/IAliasRepository";

export class AliasService {
    private repository: IAliasRepository;

    constructor() {
        this.repository = new AliasFileRepository();
    }

    public extractAlias(message: Message): Promise<string> {
        const discordId: string = message.author.id;
        const discordName: string = message.author.username;
        return this.repository.Get(discordId)
            .then(alias => alias.character)
            .catch(() => {
                throw `No alias found for **${discordName}**`
            });
    }
}