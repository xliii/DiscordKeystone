import {Command} from "../model/Command";
import {Guild, GuildMember, Message, Role, StringResolvable} from "discord.js";
import ColorService from "../service/ColorService";

class ColorCmd extends Command {

    public name(): string {
        return "Color";
    }

    protected usage(): string[] {
        return ["**Usage:** /keys color FF0000"];
    }

    // private assignRole(member: GuildMember, role: Role): Promise<any> {
    //     console.log("Add role " + role.name + " to " + member.displayName);
    //     //Retain user's non color roles, then add new role to it
    //     let roles = member.roles.map(r => r).filter(r => !ColorService.isValidColor(r.name));
    //     roles.unshift(role);
    //     return member.addRoles(roles).catch(e => console.error(e));
    // }

    protected oneArg(color: string, context: Message): Promise<StringResolvable> {
        if (!context.guild) {
            return Promise.resolve("Error! Guild wasn't found");
        }

        if (color.toLowerCase() == 'list') {
            return ColorService.listColors(context.guild).then(colorRoles => {
                if (!colorRoles || colorRoles.length === 0) {
                    return "No color roles available";
                } else {
                    colorRoles.unshift(colorRoles.length + " color roles available:")
                    return colorRoles;
                }
            })

        }

        if (color.toLowerCase() == 'clear') {
            if (context.author.id == process.env.ADMIN) {
                return ColorService.clearAllColorRoles(context.guild).then(roles => {
                    return Promise.resolve(roles.length + " roles removed");
                })
            } else {
                return Promise.resolve("Insufficient permissions");
            }
        }

        if (!ColorService.isValidColor(color)) {
            return Promise.resolve("Invalid color format. Use RBG Hex, i.e. FF0000");
        }

        color = color.toUpperCase();

        return Promise.resolve(color);
        // let new_role = context.guild.roles.find(r => r.name === color);
        // if (!new_role) {
        //     console.log("New role doesn't exist - create new role");
        //     return context.guild.createRole({
        //         color: color,
        //         name: color
        //     }).then(created => {
        //         console.log("Role created: assign");
        //         return this.assignRole(context.member, created).then(() => {
        //             return Promise.resolve("Role created and assigned: " + created.name);
        //         })
        //     }).catch(e => console.error(e));
        // } else return this.assignRole(context.member, new_role).then(() => {
        //     return Promise.resolve("Role assigned: " + new_role.name);
        // })
    }
}

export default new ColorCmd();