import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import {camelcase} from "../service/Util";
import repositories from "../repository/Repositories";
import {Keystone} from "../model/Keystone";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {Character} from "../model/Character";

const aliasRepo = repositories.aliasRepository();
const keystoneRepo = repositories.keystoneRepository();
const dungeonRepo = repositories.dungeonRepository();

class Add extends Command {

    public name(): string {
        return "Add";
    }

    protected usage(): string {
        return "/keys add {character} [dungeon] [key]";
    }

    protected twoArg(arg1: string, arg2: string, context: Message): Promise<StringResolvable> {
        let dungeon: string = arg1;
        let key: number = parseInt(arg2);
        let discordId: string = context.author.id;

        return aliasRepo.Get(discordId).then(alias => {
            return this.addKeystone(alias.character, dungeon, key);
        });
    }

    protected threeArg(arg1: string, arg2: string, arg3: string, context: Message): Promise<StringResolvable> {
        let character: string = camelcase(arg1);
        let dungeon: string = arg2;
        let key: number = parseInt(arg3);
        return this.addKeystone(character, dungeon, key);
    }

    private addKeystone(character:string, dungeonName:string, key:number): Promise<StringResolvable> {
        return dungeonRepo.GetByName(dungeonName).then(dungeon => {
            const keystone: Keystone = new Keystone(dungeon, key);
            const entry: KeystoneEntry = new KeystoneEntry(new Character(character), keystone, new Date().getTime());
            return keystoneRepo.Add(entry).then(() => {
                return `**${keystone}** added to **${character}**`;
            });
        });
    }
}

export default new Add();