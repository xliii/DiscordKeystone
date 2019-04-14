import {Alias} from "../model/Alias";
import {IRepository} from "./IRepository";

export interface IAliasRepository extends IRepository<Alias> {
    Get(discordId: string): Promise<Alias>;
    Add(alias: Alias): Promise<Boolean>;
    Remove(discordId: string): Promise<Alias | undefined>;
}