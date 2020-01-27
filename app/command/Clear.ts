import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import repositories from "../repository/Repositories";
const repository = repositories.keystoneRepository();

class Clear extends Command {

    public name(): string {
        return "Clear";
    }

    protected usage(): string {
        return "/keys clear";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return repository.Clear().then(() => {
            return "Keystones cleared";
        });
    }
}

export default new Clear();