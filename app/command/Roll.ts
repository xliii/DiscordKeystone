import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import {RollService} from "../service/RollService";

class Roll extends Command {

    public name(): string {
        return "Roll";
    }

    protected usage(): string {
        return "/keys roll [from] [to]";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return this.roll(1, 100);
    }


    protected oneArg(arg1: string, context: Message): Promise<StringResolvable> {
        let to = parseInt(arg1);
        if (isNaN(to)) {
            return Promise.resolve(this.usage());
        } else {
            return this.roll(1, to);
        }
    }

    protected twoArg(arg1: string, arg2: string, context: Message): Promise<StringResolvable> {
        let from = parseInt(arg1);
        let to = parseInt(arg2);
        if (isNaN(from) || isNaN(to)) {
            return Promise.resolve(this.usage());
        } else {
            return this.roll(from, to);
        }
    }

    private roll(from: number, to: number): Promise<StringResolvable> {
        return Promise.resolve(new RollService().roll(from, to).toString());
    }
}

export default new Roll();