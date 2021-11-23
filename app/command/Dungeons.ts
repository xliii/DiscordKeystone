import {Command} from "../model/Command";
import {Message} from "discord.js";
import repositories from "../repository/Repositories";
const repository = repositories.dungeonRepository();

class Dungeons extends Command {

    public name(): string {
        return "Dungeons";
    }

    protected usage(): string {
        return "/keys dungeons";
    }

    protected noArg(context: Message): Promise<any> {
        return repository.List().then(dungeons => {
            return "Available dungeons: \n" + dungeons
                .map(function(dungeon) {
                    return "● " + dungeon
                })
                .join('\n');
        });
    }
}

export default new Dungeons();