import fs = require("fs");
import {IDungeonRepository} from "../IDungeonRepository";
import {Dungeon} from "../../model/Dungeon";

export class DungeonFileRepository implements IDungeonRepository {

    private static PATH:string = "./data/dungeons.json";

    Get(name:string): Dungeon {
        const filtered = this.List()
            .filter(d => d.name == name || d.aliases.includes(name));

        if (!filtered || !filtered.length) {
            throw "Dungeon not found";
        }
        return filtered[0];
    }

    List(): Dungeon[] {
        return JSON.parse(fs.readFileSync(DungeonFileRepository.PATH, "utf8"))
            .map((o:any) => Dungeon.fromJSON(o));
    }
}