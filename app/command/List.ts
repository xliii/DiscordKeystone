import {Command} from "../model/Command";
import {Message, StringResolvable} from "discord.js";
import FilterService from "../service/FilterService";
import repositories from "../repository/Repositories";
import {KeystoneEntry} from "../model/KeystoneEntry";

const repository = repositories.keystoneRepository();

class List extends Command {

    public name(): string {
        return "List";
    }

    protected usage(): string {
        return "/keys list {filter}";
    }

    protected noArg(context: Message): Promise<StringResolvable> {
        return repository.List().then(keystones => {
            if (keystones.length == 0) {
                return "No keystones available";
            }

            keystones = keystones.sort(this.byDungeon);
            let result = [];
            result.push('All keystones:');
            result.push(...keystones);
            return result;
        });
    }

    protected oneArg(filter: string, context: Message): Promise<StringResolvable> {
        return repository.List().then(keystones => {
            if (keystones.length == 0) {
                return "No keystones available";
            }

            keystones = keystones.sort(this.byDungeon);

            const filterObj = FilterService.create(filter);
            if (filterObj) {
                let result = [];
                result.push(filterObj.header);
                keystones = keystones.filter(filterObj.filter);
                if (keystones.length == 0) {
                    result.push("No keystones available");
                } else {
                    result.push(...keystones);
                }
                return result;
            } else {
                return "Invalid filter";
            }
        });
    }

    private byDungeon(a: KeystoneEntry, b: KeystoneEntry): number {
        return a.keystone.dungeon.name.localeCompare(b.keystone.dungeon.name);
    }

    private byKey(a: KeystoneEntry, b: KeystoneEntry): number {
        return a.keystone.key - b.keystone.key;
    }
}

export default new List();