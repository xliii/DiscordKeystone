import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {Dungeon} from "../model/Dungeon";
import {StringResolvable} from "discord.js";

module.exports = function(args: string[]): StringResolvable {
    let repository = new DungeonFileRepository();
    let dungeons:Dungeon[] = repository.List();

    return "Available dungeons: \n" + dungeons
        .map(function(dungeon) {
            return "● " + dungeon
        })
        .join('\n');
};