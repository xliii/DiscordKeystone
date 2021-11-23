import {Command} from "../model/Command";
import {Guild, GuildMember, Message, Role} from "discord.js";
import ColorService from "../service/ColorService";

class ColorCmd extends Command {

    public name(): string {
        return "Color";
    }

    protected usage(): string[] {
        return ["**Usage:** /keys color FF0000"];
    }
    //
    // private assignRole(member: GuildMember, role: Role): Promise<Role> {
    //     console.log("Add role " + role.name + " to " + member.displayName);
    //     return member.roles.add(role).then(() => {
    //         return Promise.resolve(role);
    //     });
    // }
    //
    // private clearColorRoles(member: GuildMember): Promise<any> {
    //     let colorRoles = member.roles.cache.filter(r => ColorService.isValidColor(r.name));
    //     console.log("Clearing " + colorRoles.size + " color roles from " + member.displayName);
    //     return member.roles.remove(colorRoles);
    // }

    protected oneArg(color: string, context: Message): Promise<any> {
        return Promise.resolve("This command is temporarily disabled");
        // if (!context.guild) {
        //     return Promise.resolve("Error! Guild wasn't found");
        // }
        //
        // if (!context.member) {
        //     return Promise.resolve("Error! Author user wasn't found");
        // }
        //
        // const guild = context.guild;
        //
        // if (color.toLowerCase() == 'list') {
        //     return ColorService.listColors(guild).then(colorRoles => {
        //         if (!colorRoles || colorRoles.length === 0) {
        //             return "No color roles available";
        //         } else {
        //             colorRoles.unshift(colorRoles.length + " color roles available:");
        //             return colorRoles;
        //         }
        //     })
        //
        // }
        //
        // if (color.toLowerCase() == 'clear') {
        //     if (context.author.id == process.env.ADMIN) {
        //         return ColorService.clearAllColorRoles(guild).then(roles => {
        //             return Promise.resolve(roles.length + " roles removed");
        //         })
        //     } else {
        //         return Promise.resolve("Insufficient permissions");
        //     }
        // }
        //
        // if (!ColorService.isValidColor(color)) {
        //     return Promise.resolve("Invalid color format. Use RBG Hex, i.e. FF0000");
        // }
        //
        // color = color.toUpperCase();
        //
        // return guild.members.fetch(context.author).then(member => {
        //     return this.clearColorRoles(member).then(() => {
        //         return guild.roles.fetch().then(roles => {
        //             let role = roles.cache.find(r => r.name === color);
        //             if (!role) {
        //                 let bot_role = roles.cache.find(r => r.name === "keystone-bot");
        //                 if (!bot_role) {
        //                     return Promise.resolve("Error! 'keystone-bot' role not found");
        //                 }
        //                 return guild.roles.create({
        //                     name: color,
        //                     color: color,
        //                     position: bot_role.position - 1,
        //                     mentionable: false
        //                 }).then(role => {
        //                     return this.assignRole(member, role).then(role => {
        //                         return Promise.resolve("Role created and assigned: " + role.name);
        //                     });
        //                 })
        //                 //create role
        //             } else {
        //                 return this.assignRole(member, role).then(role => {
        //                     return Promise.resolve("Role assigned: " + role.name);
        //                 });
        //             }
        //         });
        //     });
        // });
    }
}

export default new ColorCmd();