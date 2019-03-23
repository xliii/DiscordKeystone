export class Dungeon {
    name: string;
    aliases: string[];

    constructor(name: string, aliases: string[]) {
        this.name = name;
        this.aliases = aliases;
    }

    public toString():string {
        return `**${this.name}** (${this.aliases.join(', ')})`;
    }

    public static fromJSON(obj: any): Dungeon {
        return new Dungeon(obj["name"], obj["aliases"]);
    }
}