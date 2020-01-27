import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import {camelcase} from "../service/Util";
import repositories from "../repository/Repositories";
import {Keystone} from "../model/Keystone";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Character} from "../model/Character";
import {Alias} from "../model/Alias";
import {AliasService} from "../service/AliasService";

const repository = repositories.aliasRepository();

class AliasCmd extends Command {

    public name(): string {
        return "Alias";
    }

    protected usage(): string[] {
        return ["/keys alias set [character]",
                "/keys alias get",
                "/keys alias list",
                "/keys alias remove"];
    }

    protected twoArg(option: string, character: string, context: Message): Promise<StringResolvable> {
        if (option === 'set') {
            return this.set(character, context);
        } else {
            return Promise.resolve(this.usage());
        }
    }

    protected oneArg(option: string, context: Message): Promise<StringResolvable> {
        switch (option) {
            case 'get': return this.get(context);
            case 'remove': return this.remove(context);
            case 'list': return this.list();
            default: return Promise.resolve(this.usage());
        }
    }

    private get(context: Message): Promise<StringResolvable> {
        let service = new AliasService();
        return service.extractAlias(context).then(character => {
            return `**${context.author.username}**'s alias is **${character}**`;
        })
    }

    private list(): Promise<StringResolvable> {
        return repository.List().then(aliases => {
            return aliases.length > 0 ?
                aliases :
                "No aliases available";
        });
    }

    private remove(message: Message): Promise<StringResolvable> {
        const discordId: string = message.author.id;
        const discordName: string = message.author.username;
        return repository.Remove(discordId).then(alias => {
            return alias ?
                `Alias **${alias.character}** removed from **${discordName}**` :
                `No alias found for **${discordName}**`;
        })
    }

    private set(character: string, context: Message): Promise<StringResolvable> {
        const discordId: string = context.author.id;
        const discordName: string = context.author.username;
        character = camelcase(character);

        return repository.Add(new Alias(discordName, discordId, character)).then(() => {
            return `Alias **${character}** added for **${discordName}**`;
        });
    }
}

export default new AliasCmd();