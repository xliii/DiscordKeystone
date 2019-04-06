import {Message} from "discord.js";
import {AliasFileRepository} from "../repository/file/AliasFileRepository";
import {IAliasRepository} from "../repository/IAliasRepository";

export class AliasService {

    repository: IAliasRepository;

    constructor() {
        this.repository = new AliasFileRepository();
    }

    public extractAlias(message: Message): string {
        const discordId: string = message.author.id;
        const discordName: string = message.author.username;
        try {
            const alias = this.repository.Get(discordId);
            return alias.character;
        } catch (e) {
            throw `No alias found for **${discordName}**`;
        }
    }
}