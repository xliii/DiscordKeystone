import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(): StringResolvable {
    let repository = new KeystoneEntryFileRepository();
    repository.Clear();
    return "Keystones cleared";
};