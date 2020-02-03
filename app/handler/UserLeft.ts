import {Client, GuildMember} from "discord.js";
import RagequitService from "../service/RagequitService";

module.exports = function(client: Client, member: GuildMember): void {
    if (member.guild.id !== process.env.GUILD_ID) {
        return;
    }

    console.log(`User left: ${member.displayName}`);
    RagequitService.userLeft(client, member.displayName);
};