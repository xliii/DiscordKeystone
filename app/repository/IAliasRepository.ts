import {Alias} from "../model/Alias";

export interface IAliasRepository {
    List(): Alias[];
    Get(discordId:string): Alias;
    Add(alias: Alias): void;
}