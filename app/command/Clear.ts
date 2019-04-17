import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(): Promise<StringResolvable> {
    let repository = new KeystoneEntryFileRepository();
    return repository.Clear().then(() => {
        return "Keystones cleared";
    });
};