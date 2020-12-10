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

    public listColors(guild: Guild): string[] {
        return this.getColorRoles(guild).map(r => r.name);
    }

    private getColorRoles(guild: Guild): Collection<string, Role> {
        return guild.roles.filter(r => this.isValidColor(r.name));
    }

    public clearAllColorRoles(guild: Guild): Promise<Role[]> {
        return this.deleteRoles(this.getColorRoles(guild));
    }

    private deleteRoles(roles: Collection<string, Role>): Promise<Role[]> {
        let promises: Promise<Role>[] = [];
        roles.forEach(role => {
            promises.push(role.delete());
        });
        return Promise.all(promises);
    }

    private processCleanup(client:Client) {
        let guild = client.guilds.find(g => g.id === process.env.GUILD_ID);
        if (guild) {
            let colorRoles = guild.roles.filter(r => this.isValidColor(r.name));
            colorRoles.forEach(role => {
                //console.log(role.name + " -> " + guild.members.filter(m => m.roles.has(role.id)).size);
            });
            console.log(guild.name);
            console.log(guild.memberCount);

            guild.fetchMembers().then().then(g => g.members.forEach(member => {
                console.log(member.displayName + " -> " + member.roles.map(r => r.name));
            }));
            // let toCleanup = colorRoles.filter(r => r.members.size == 0);
            // this.deleteRoles(toCleanup).then(roles => {
            //     console.log("Cleaned up " + roles.length + " color roles");
            // });
        }
    }
}

export default new ColorService();