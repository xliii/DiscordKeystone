import {StringResolvable} from "discord.js";

import repositories from "../../repository/Repositories";
const repository = repositories.dungeonRepository();

module.exports = function(): Promise<StringResolvable> {
    return repository.List().then(dungeons => {
        return "Available dungeons: \n" + dungeons
            .map(function(dungeon) {
                return "● " + dungeon
            })
            .join('\n');
    });
};