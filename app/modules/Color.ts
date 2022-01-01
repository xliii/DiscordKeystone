import ColorService from "../service/ColorService";
import {GuildMember, Role} from "discord.js";

function clearColorRoles(member: GuildMember): Promise<any> {
    let colorRoles = member.roles.cache.filter(r => ColorService.isValidColor(r.name));
    console.log("Clearing " + colorRoles.size + " color roles from " + member.displayName);
    return member.roles.remove(colorRoles);
}

function assignRole(member: GuildMember, role: Role): Promise<Role> {
    console.log("Add role " + role.name + " to " + member.displayName);
    return member.roles.add(role).then(() => {
        return Promise.resolve(role);
    });
}

module.exports = function processCommand(interaction: any): Promise<any> {
    const guild = interaction.guild;
    const user = interaction.user;
    let color = interaction.options.getString('color');

    return Promise.resolve("Command currently disabled");

    if (!ColorService.isValidColor(color)) {
        return Promise.resolve("Invalid color format. Use RBG Hex, i.e. FF0000");
    }

    color = color.toUpperCase();

    return guild.members.fetch(user).then((member: any) => {
        return clearColorRoles(member).then(() => {
            return guild.roles.fetch().then((roles: any) => {
                let role = roles.cache.find((r: any) => r.name === color);
                if (!role) {
                    let bot_role = roles.cache.find((r: any) => r.name === "keystone-bot");
                    if (!bot_role) {
                        return Promise.resolve("Error! 'keystone-bot' role not found");
                    }
                    return guild.roles.create({
                        name: color,
                        color: color,
                        position: bot_role.position - 1,
                        mentionable: false
                    }).then((role: any) => {
                        return assignRole(member, role).then(role => {
                            return Promise.resolve("Role created and assigned: " + role.name);
                        });
                    })
                    //create role
                } else {
                    return assignRole(member, role).then(role => {
                        return Promise.resolve("Role assigned: " + role.name);
                    });
                }
            });
        });
    });
};