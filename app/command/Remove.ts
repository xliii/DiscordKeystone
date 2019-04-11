import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(args: string[]): StringResolvable {
    if (args.length !== 1) {
        return "Usage: **/keys remove [character]**";
    }

    let user:string = args[0];
    let repository = new KeystoneEntryFileRepository();
    return repository.Remove(user).then(keystone => {
        return keystone ?
            `**${keystone.keystone}** removed from **${user}**` :
            `No keystone found for **${user}**`;
    });
};