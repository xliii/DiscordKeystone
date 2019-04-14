import {DungeonFileRepository} from "../repository/file/DungeonFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(): Promise<StringResolvable> {
    const repository = new DungeonFileRepository();
    return repository.List().then(dungeons => {
        return "Available dungeons: \n" + dungeons
            .map(function(dungeon) {
                return "● " + dungeon
            })
            .join('\n');
    });
};