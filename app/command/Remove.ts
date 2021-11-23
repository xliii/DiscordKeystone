import {Command} from "../model/Command";
import {Message} from "discord.js";
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

    clearInput(): boolean {
        return true;
    }

    protected oneArg(arg1: string, context: Message): Promise<any> {
        let user: string = camelcase(arg1);

        return repository.Remove(user).then(keystone => {
            return keystone ?
                `**${keystone.keystone}** removed from **${user}**` :
                `No keystone found for **${user}**`;
        });
    }
}

export default new Remove();