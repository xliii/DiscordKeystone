import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {Dungeon} from "../model/Dungeon";

module.exports = function(args: string[]): any {
    let repository = new DungeonFileRepository();
    let dungeons:Dungeon[] = repository.List();

    return "Available dungeons: \n" + dungeons
        .map(function(dungeon) {
            return "● " + dungeon
        })
        .join('\n');
};