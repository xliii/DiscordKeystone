import {IAliasRepository} from "../IAliasRepository";
import {Alias} from "../../model/Alias";
import {AbstractFileRepository} from "./AbstractFileRepository";

export class AliasFileRepository extends AbstractFileRepository implements IAliasRepository {

    protected repoPath(): string {
        return "./data/aliases.json";
    }

    List(): Promise<Alias[]> {
        return this.readObject().then((map: any) => {
            return Object.keys(map)
                .map(prop => Alias.fromJSON(map[prop]));
        });
    }

    Add(alias: Alias): Promise<Boolean> {
        return this.readObject().then((map: any) => {
            let key = alias.discordId;
            if (map[key] && alias.equals(map[key])) {
                return false;
            }

            map[key] = alias;
            return this.write(map).then(() => true);
        });
    }

    Get(discordId: string): Promise<Alias> {
        return this.List().then(aliases => {
            const alias = aliases.find(a => a.discordId === discordId);
            if (!alias) {
                throw "Alias not found";
            }

            return alias;
        });
    }

    Remove(discordId: string): Promise<Alias | undefined> {
        return this.readObject().then((map: any) => {
            let alias = map[discordId];
            if (!alias) {
                return Promise.resolve(undefined);
            }

            delete map[discordId];
            return this.write(map).then(() => Alias.fromJSON(alias));
        });
    }
}