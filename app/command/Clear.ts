import repository from "../repository/file/KeystoneEntryFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(): Promise<StringResolvable> {
    return repository.Clear().then(() => {
        return "Keystones cleared";
    });
};