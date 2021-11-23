import {Command} from "../model/Command";
import {Message} from "discord.js";
import repositories from "../repository/Repositories";
const repository = repositories.keystoneRepository();

class Clear extends Command {

    public name(): string {
        return "Clear";
    }

    protected usage(): string {
        return "/keys clear";
    }

    clearInput(): boolean {
        return true;
    }

    protected noArg(context: Message): Promise<any> {
        return repository.Clear().then(() => {
            return "Keystones cleared";
        });
    }
}

export default new Clear();