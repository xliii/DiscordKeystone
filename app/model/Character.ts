import {defaultRealm} from "./Settings";

export class Character {
    name: string;
    realm: string;

    constructor(name: string, realm: string = defaultRealm()) {
        this.name = name;
        this.realm = realm;
    }

    toString():string {
        return this.name;
    }

    public equals(other:Character): boolean {
        return this.name == other.name && this.realm == other.realm;
    }

    public static fromJSON(obj:any): Character {
        return new Character(obj["name"], obj["realm"]);
    }
}