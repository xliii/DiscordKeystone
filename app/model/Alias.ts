export class Alias {

    discordName: string;
    discordId: string;
    character: string;

    constructor(discordName: string, discordId: string, character: string) {
        this.discordName = discordName;
        this.discordId = discordId;
        this.character = character;
    }

    public equals(o: Alias): boolean {
        return this.discordId === o.discordId && this.character === o.character;
    }

    toString():string {
        return `**${this.discordName}**: ${this.character}`;
    }

    public static fromJSON(obj:any): Alias {
        return new Alias(obj["discordName"], obj["discordId"], obj["character"]);
    }
}