import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import {camelcase} from "../service/Util";
import repositories from "../repository/Repositories";
const repository = repositories.keystoneRepository();

class Remove extends Command {

    public name(): string {
        return "Remove";
    }

    protected usage(): string {
        return "/keys remove [character]";
    }

    protected oneArg(arg1: string, context: Message): Promise<StringResolvable> {
        let user: string = camelcase(arg1);

        return repository.Remove(user).then(keystone => {
            return keystone ?
                `**${keystone.keystone}** removed from **${user}**` :
                `No keystone found for **${user}**`;
        });
    }
}

export default new Remove();