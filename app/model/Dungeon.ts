export class Dungeon {
    id: number;
    name: string;
    aliases: string[];

    constructor(id: number, name: string, aliases: string[]) {
        this.id = id;
        this.name = name;
        this.aliases = aliases;
    }

    toString():string {
        return `**${this.name}** (${this.aliases.join(', ')})`;
    }

    public matches(name: string): boolean {
        return this.name.toLowerCase() === name.toLowerCase()
            || this.aliases.findIndex(a => a.toLowerCase() === name.toLowerCase()) >= 0;
    }

    public equals(o: Dungeon): boolean {
        return this.id == o.id;
    }

    public static fromJSON(obj: any): Dungeon {
        return new Dungeon(obj["id"], obj["name"], obj["aliases"]);
    }
}