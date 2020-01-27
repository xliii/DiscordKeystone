import {StringResolvable} from "discord.js";

import repositories from "../../repository/Repositories";
import {camelcase} from "../../service/Util";
const repository = repositories.keystoneRepository();

module.exports = function(args: string[]): StringResolvable {
    if (args.length !== 1) {
        return "Usage: **/keys remove [character]**";
    }

    let user:string = camelcase(args[0]);
    return repository.Remove(user).then(keystone => {
        return keystone ?
            `**${keystone.keystone}** removed from **${user}**` :
            `No keystone found for **${user}**`;
    });
};