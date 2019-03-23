import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";

module.exports = function(args: string[]): any {
    let repository = new KeystoneEntryFileRepository();
    repository.Clear();
    return "Keystones cleared";
};