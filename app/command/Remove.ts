import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {StringResolvable} from "discord.js";

module.exports = function(args: string[]): StringResolvable {
    if (args.length !== 1) {
        return "Usage: **/keys remove [character]**";
    }

    let user:string = args[0];
    let repository = new KeystoneEntryFileRepository();
    let keystone = repository.Remove(user);
    return keystone ?
        `**${keystone}** removed from **${user}**` :
        `No keystone found for **${user}**`;
};