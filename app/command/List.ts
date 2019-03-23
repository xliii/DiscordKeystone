import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {KeystoneEntry} from "../model/KeystoneEntry";

module.exports = function(args: string[]): any {
    let repository = new KeystoneEntryFileRepository();
    let keystones:KeystoneEntry[] = repository.List();

    return keystones.length > 0 ?
        keystones :
        "No keystones available";
};