import {Command} from "../model/Command";
import {Message} from "discord.js";
import {FEATURE_PHREAKS} from "../model/Features";
import RagequitService from "../service/RagequitService";

class Ragequit extends Command {

    public name(): string {
        return "Ragequit";
    }

    protected aliases(): string[] {
        return ["rq"];
    }

    protected usage(): string {
        return "/keys ragequit";
    }

    feature(): string {
        return FEATURE_PHREAKS;
    }

    protected noArg(context: Message): Promise<any> {
        return RagequitService.getCounter().then(counter => {
                return `Days since last ragequit: ${counter}`;
            }
        )
    }
}

export default new Ragequit();