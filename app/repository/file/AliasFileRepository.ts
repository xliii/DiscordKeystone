import fs = require("fs");
import ErrnoException = NodeJS.ErrnoException;
import {IAliasRepository} from "../IAliasRepository";
import {Alias} from "../../model/Alias";

export class AliasFileRepository implements IAliasRepository {

    private static PATH:string = "./data/aliases.json";
    List(): Alias[] {
        return fs.existsSync(AliasFileRepository.PATH) ?
        JSON.parse(fs.readFileSync(AliasFileRepository.PATH, "utf8"))
            .map((o:any) => Alias.fromJSON(o)) :
        [];
    }

    Add(alias: Alias): void {
        let aliases: Alias[] = this.List();
        aliases = aliases.filter(a => a.discordId !== alias.discordId);
        aliases.push(alias);
        this.write(aliases);
    }

    Get(discordId: string): Alias {
        const filtered = this.List()
            .filter(a => a.discordId === discordId);

        if (!filtered || !filtered.length) {
            throw "Alias not found";
        }
        return filtered[0];
    }

    private write(aliases:Alias[]): void {
        const data = JSON.stringify(aliases, null, 2);
        fs.writeFile(AliasFileRepository.PATH, data, "utf8", AliasFileRepository.writeCallback);
    }

    private static writeCallback(err: ErrnoException): void {
        if (err) {
            console.error("Failed writing Keystones", err);
        }
    }

}