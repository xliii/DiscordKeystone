import repository from "../repository/file/DungeonFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(): Promise<StringResolvable> {
    return repository.List().then(dungeons => {
        return "Available dungeons: \n" + dungeons
            .map(function(dungeon) {
                return "● " + dungeon
            })
            .join('\n');
    });
};