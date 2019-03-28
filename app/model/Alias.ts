export class Alias {

    discordId: string;
    character: string;

    constructor(discordId: string, character: string) {
        this.discordId = discordId;
        this.character = character;
    }

    public static fromJSON(obj:any): Alias {
        return new Alias(obj["discordId"], obj["character"]);
    }
}