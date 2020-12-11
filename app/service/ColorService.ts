import {Job, scheduleJob} from "node-schedule";
import {Client, Collection, Guild, Role, StringResolvable} from "discord.js";

class ColorService {

    private regex = /^(?:[0-9a-fA-F]{6})$/gi;
    private job?: Job;

    public scheduleCleanup(client: Client) {
        this.processCleanup(client);
        this.job = scheduleJob("0 */2 * * * *", () => {
            this.processCleanup(client);
        });
    }

    public isValidColor(color: string): boolean {
        return color.match(this.regex) != null;
    }

    public listColors(guild: Guild): Promise<string[]> {
        return this.getColorRoles(guild).then(roles => {
            return roles.map(r => r.name);
        })
    }

    private getColorRoles(guild: Guild): Promise<Collection<string, Role>> {
        return guild.roles.fetch().then(roles => {
            return roles.cache.filter(r => this.isValidColor(r.name));
        });
    }

    public clearAllColorRoles(guild: Guild): Promise<Role[]> {
        return this.getColorRoles(guild).then(roles => {
            return this.deleteRoles(roles);
        });
    }

    private deleteRoles(roles: Collection<string, Role>): Promise<Role[]> {
        let promises: Promise<Role>[] = [];
        roles.forEach(role => {
            promises.push(role.delete());
        });
        return Promise.all(promises);
    }

    private processCleanup(client:Client) {
        client.guilds.fetch(process.env.GUILD_ID || '').then(guild => {
            if (guild) {
                guild.roles.fetch().then(roles => {
                    let toCleanup = roles.cache.filter(r => this.isValidColor(r.name));

                    guild.members.fetch().then(members => {
                        members.forEach(member => {
                            member.roles.cache.forEach(memberRole => {
                                toCleanup = toCleanup.filter(role => role.name !== memberRole.name);
                            });
                        });

                        let msg = `Cleaning up ${toCleanup.size} roles`;
                        if (toCleanup.size > 0) {
                            msg += ": " + toCleanup.map(r => r.name);
                        }

                        console.log(msg);

                        this.deleteRoles(toCleanup).catch(e => console.error(e));
                    });
                });
            }
        });
    }
}

export default new ColorService();