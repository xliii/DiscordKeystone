import {IDungeonRepository} from "../IDungeonRepository";
import {Dungeon} from "../../model/Dungeon";
import {AbstractBlobRepository} from "./AbstractBlobRepository";

export class DungeonBlobRepository extends AbstractBlobRepository implements IDungeonRepository {

    protected blobName(): string {
        return "dungeons.json";
    }

    Get(id: number): Promise<Dungeon> {
        return this.List().then(dungeons => {
            const dungeon = dungeons.find(d => d.id === id);
            if (!dungeon) {
                throw `Dungeon not found: ${id}`;
            }
            return dungeon;
        });
    }

    GetByName(name:string): Promise<Dungeon> {
        return this.List().then(dungeons => {
            const dungeon = dungeons.find(d => d.matches(name));

            if (!dungeon) {
                throw `Dungeon not found: ${name}`;
            }
            return dungeon;
        });

    }

    List(): Promise<Dungeon[]> {
        return this.readArray().then(dungeons => {
            return dungeons.map((dungeon: any) => Dungeon.fromJSON(dungeon));
        });
    }
}