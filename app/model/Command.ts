import {Message, StringResolvable} from "discord.js";
import {FEATURE_DEFAULT} from "./Features";

export abstract class Command {

    protected aliases(): string[] {
        return [];
    }

    public abstract name(): string;

    protected abstract usage(): StringResolvable;

    protected noArg(context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.usage());
    }

    protected oneArg(arg1: string, context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.usage());
    }

    protected twoArg(arg1: string, arg2: string, context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.usage());
    }

    protected threeArg(arg1: string, arg2: string, arg3: string, context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.usage());
    }

    protected fourArg(arg1: string, arg2: string, arg3: string, arg4: string, context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.usage());
    }

    protected customArg(args: string[], context: Message): Promise<StringResolvable> {
        return Promise.resolve(this.usage());
    }

    public feature(): string {
        return FEATURE_DEFAULT;
    }

    public clearInput(): boolean {
        return false;
    }

    public process(args: string[], context: Message): Promise<StringResolvable> {
        switch (args.length) {
            case 0: return this.noArg(context);
            case 1: return this.oneArg(args[0], context);
            case 2: return this.twoArg(args[0], args[1], context);
            case 3: return this.threeArg(args[0], args[1], args[2], context);
            case 4: return this.fourArg(args[0], args[1], args[2], args[3], context);
            default: return this.customArg(args, context);
        }
    }

    public matches(cmd: string): boolean {
        if (cmd.toLowerCase() ==  this.name().toLowerCase()) {
            return true;
        }

        return this.aliases().some(alias => alias.toLowerCase() == cmd.toLowerCase());
    }
}