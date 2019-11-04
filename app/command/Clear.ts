import {StringResolvable} from "discord.js";

import repositories from "../repository/Repositories";
const repository = repositories.keystoneRepository();

module.exports = function(): Promise<StringResolvable> {
    return repository.Clear().then(() => {
        return "Keystones cleared";
    });
};