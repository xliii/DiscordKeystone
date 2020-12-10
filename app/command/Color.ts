import {Command} from "../model/Command";
import {GuildMember, Message, Role, StringResolvable} from "discord.js";

class ColorCmd extends Command {

    private regex = /^(?:[0-9a-fA-F]{3}){1,2}$/gi;

    public name(): string {
        return "Color";
    }

    protected usage(): string[] {
        return ["**Usage:** /keys color FF0000"];
    }

    private isValid(color: string): boolean {
        return color.match(this.regex) != null;
    }

    private assignRole(member: GuildMember, role: Role, cleanupRole?: Role): Promise<StringResolvable> {
        console.log("Add role " + role.name + " to " + member.displayName);
        let roles = [role];
        return member.addRoles(roles).then(() => {
            console.log("Role added");
            if (cleanupRole) {
                return cleanupRole.delete().then(() => {
                    return Promise.resolve("Role created and assigned: " + role.name);
                }).catch(e => console.error(e));
            } else {
                return Promise.resolve("Role created and assigned: " + role.name);
            }
        }).catch(e => console.error(e));
    }

    protected oneArg(color: string, context: Message): Promise<StringResolvable> {
        if (!this.isValid(color)) {
            return Promise.resolve("Invalid color format. Use RBG Hex, i.e. FF0000");
        }

        color = color.toUpperCase();

        let current_role = context.member.roles.find(r => this.isValid(r.name));
        if (current_role) {
            console.log("Found current role: " + current_role.name);
        }

        let cleanup = current_role && current_role.members.size <= 1;

        let new_role = context.guild.roles.find(r => r.name === color);
        if (!new_role) {
            console.log("New role doesn't exist - create new role");
            return context.guild.createRole({
                color: color,
                name: color
            }).then(created => {
                console.log("Role created: assign");
                return this.assignRole(context.member, created, cleanup ? current_role : undefined);
            }).catch(e => console.error(e));
        } else return this.assignRole(context.member, new_role, cleanup ? current_role : undefined);

    }
}

export default new ColorCmd();